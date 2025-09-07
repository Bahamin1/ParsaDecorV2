import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true" ? true : undefined
    const status = searchParams.get("status") as "active" | "inactive" | "out_of_stock" | undefined
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined

    let query = supabaseAdmin.from("products").select("*")

    if (category) {
      query = query.eq("category", category)
    }
    if (featured !== undefined) {
      query = query.eq("featured", featured)
    }
    if (status) {
      query = query.eq("status", status)
    } else {
      query = query.eq("status", "active") // Default to active products
    }
    if (limit) {
      query = query.limit(limit)
    }
    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1)
    }

    query = query.order("created_at", { ascending: false })

    const { data: products, error } = await query

    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`)
    }

    return NextResponse.json({ success: true, products }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get products error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500, headers: corsHeaders() },
    )
  }
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const productData = await req.json()

      const { data: product, error } = await supabaseAdmin
        .from("products")
        .insert({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          images: productData.images || [],
          featured: productData.featured || false,
          status: productData.status || "active",
          stock_quantity: productData.stock_quantity || 0,
          sku: productData.sku,
          material: productData.material,
          color: productData.color,
          weight: productData.weight,
          dimensions: productData.dimensions,
          tags: productData.tags || [],
          created_by: user.id,
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to create product: ${error.message}`)
      }

      return NextResponse.json({ success: true, product }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Create product error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to create product" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
