import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400, headers: corsHeaders() })
    }

    const supabase = createClient()

    // Check if email already exists
    const { data: existing } = await supabase.from("newsletter_subscribers").select("id").eq("email", email).single()

    if (existing) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 409, headers: corsHeaders() })
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          name: name || null,
          subscribed_at: new Date().toISOString(),
          status: "active",
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 200, headers: corsHeaders() },
    )
  } catch (error) {
    console.error("Newsletter API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() })
  }
}

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get("status") as "active" | "unsubscribed" | null

      const supabase = createClient()

      let query = supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false })

      if (status) {
        query = query.eq("status", status)
      }

      const { data, error } = await query

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500, headers: corsHeaders() })
      }

      return NextResponse.json({ data }, { status: 200, headers: corsHeaders() })
    } catch (error) {
      console.error("Newsletter API error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() })
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
