import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, projectType, budget, timeline, description, location } = body

    // Validate required fields
    if (!name || !email || !projectType || !description) {
      return NextResponse.json(
        { error: "Name, email, project type, and description are required" },
        { status: 400, headers: corsHeaders() },
      )
    }

    const supabase = createClient()

    // Insert quote request
    const { data, error } = await supabase
      .from("quote_requests")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          project_type: projectType,
          budget: budget || null,
          timeline: timeline || null,
          description,
          location: location || null,
          status: "new",
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json(
      {
        message: "Quote request submitted successfully",
        data: data[0],
      },
      { status: 200, headers: corsHeaders() },
    )
  } catch (error) {
    console.error("Quote API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() })
  }
}

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get("status") as "new" | "reviewed" | "quoted" | "closed" | null

      const supabase = createClient()

      let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false })

      if (status) {
        query = query.eq("status", status)
      }

      const { data, error } = await query

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to fetch quote requests" }, { status: 500, headers: corsHeaders() })
      }

      return NextResponse.json({ data }, { status: 200, headers: corsHeaders() })
    } catch (error) {
      console.error("Quote API error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() })
    }
  })
}

export async function PUT(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { id, status } = await req.json()

      if (!id || !status) {
        return NextResponse.json({ error: "ID and status are required" }, { status: 400, headers: corsHeaders() })
      }

      const supabase = createClient()

      const { data, error } = await supabase.from("quote_requests").update({ status }).eq("id", id).select()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to update quote request" }, { status: 500, headers: corsHeaders() })
      }

      return NextResponse.json({ success: true, data: data[0] }, { headers: corsHeaders() })
    } catch (error) {
      console.error("Update quote request error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to update quote request" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
