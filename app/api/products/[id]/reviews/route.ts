import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: reviews, error } = await supabaseAdmin
      .from("product_reviews")
      .select("*")
      .eq("product_id", params.id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`)
    }

    return NextResponse.json({ success: true, reviews }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get reviews error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch reviews" },
      { status: 500, headers: corsHeaders() },
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { user_name, user_email, rating, title, comment } = await request.json()

    if (!user_name || !user_email || !rating || !comment) {
      return NextResponse.json(
        { error: "Name, email, rating, and comment are required" },
        { status: 400, headers: corsHeaders() },
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400, headers: corsHeaders() })
    }

    const { data: review, error } = await supabaseAdmin
      .from("product_reviews")
      .insert({
        product_id: params.id,
        user_name: user_name.trim(),
        user_email: user_email.trim().toLowerCase(),
        rating,
        title: title?.trim(),
        comment: comment.trim(),
        status: "pending", // Reviews need approval
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create review: ${error.message}`)
    }

    return NextResponse.json(
      { success: true, review, message: "Review submitted successfully and is pending approval" },
      { headers: corsHeaders() },
    )
  } catch (error: any) {
    console.error("Create review error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create review" },
      { status: 500, headers: corsHeaders() },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
