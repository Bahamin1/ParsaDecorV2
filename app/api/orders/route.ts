import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get("status")
      const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
      const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined

      let query = supabaseAdmin.from("orders").select(`
          *,
          order_items (
            *,
            products (name, images)
          )
        `)

      if (status) {
        query = query.eq("status", status)
      }
      if (limit) {
        query = query.limit(limit)
      }
      if (offset) {
        query = query.range(offset, offset + (limit || 10) - 1)
      }

      query = query.order("created_at", { ascending: false })

      const { data: orders, error } = await query

      if (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`)
      }

      return NextResponse.json({ success: true, orders }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Get orders error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to fetch orders" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      billing_address,
      items,
      payment_method,
      notes,
    } = orderData

    if (!customer_name || !customer_email || !shipping_address || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400, headers: corsHeaders() })
    }

    // Calculate total amount
    let total_amount = 0
    for (const item of items) {
      const { data: product } = await supabaseAdmin
        .from("products")
        .select("price, stock_quantity")
        .eq("id", item.product_id)
        .single()

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.product_id} not found` },
          { status: 400, headers: corsHeaders() },
        )
      }

      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${item.product_id}` },
          { status: 400, headers: corsHeaders() },
        )
      }

      total_amount += product.price * item.quantity
    }

    // Generate order number
    const orderNumber = `PD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customer_name.trim(),
        customer_email: customer_email.trim().toLowerCase(),
        customer_phone: customer_phone?.trim(),
        shipping_address: shipping_address.trim(),
        billing_address: billing_address?.trim() || shipping_address.trim(),
        total_amount,
        payment_method: payment_method || "pending",
        notes: notes?.trim(),
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
    }))

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems)

    if (itemsError) {
      // Rollback order if items creation fails
      await supabaseAdmin.from("orders").delete().eq("id", order.id)
      throw new Error(`Failed to create order items: ${itemsError.message}`)
    }

    // Update product stock quantities
    for (const item of items) {
      await supabaseAdmin
        .from("products")
        .update({
          stock_quantity: supabaseAdmin.raw(`stock_quantity - ${item.quantity}`),
        })
        .eq("id", item.product_id)
    }

    return NextResponse.json(
      { success: true, order, message: "Order created successfully" },
      { headers: corsHeaders() },
    )
  } catch (error: any) {
    console.error("Create order error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500, headers: corsHeaders() },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
