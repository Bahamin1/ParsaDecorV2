import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: product, error } = await supabaseAdmin.from("products").select("*").eq("id", params.id).single()

    if (error) {
      throw new Error(`Failed to fetch product: ${error.message}`)
    }

    return NextResponse.json({ success: true, product }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get product error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch product" },
      { status: 404, headers: corsHeaders() },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const updates = await req.json()

      const { data: product, error } = await supabaseAdmin
        .from("products")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
        .select()
        .single()

      if (error) {
        throw new Error(`Failed to update product: ${error.message}`)
      }

      return NextResponse.json({ success: true, product }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Update product error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to update product" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { error } = await supabaseAdmin.from("products").delete().eq("id", params.id)

      if (error) {
        throw new Error(`Failed to delete product: ${error.message}`)
      }

      return NextResponse.json({ success: true, message: "Product deleted successfully" }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Delete product error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to delete product" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
