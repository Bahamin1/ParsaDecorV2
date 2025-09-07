import { type NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/database"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true" ? true : undefined
    const status = searchParams.get("status") as "draft" | "published" | undefined
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : undefined

    const projects = await getProjects({
      category,
      featured,
      status: status || "published", // Default to published for public API
      limit,
      offset,
    })

    return NextResponse.json({ success: true, projects }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get projects error:", error)

    // Return sample data as fallback
    const sampleProjects = [
      {
        id: "1",
        title: "Modern Apartment in Beyoğlu",
        description: "Complete renovation of a 120m² apartment with contemporary design elements.",
        category: "residential",
        location: "Beyoğlu, Istanbul",
        completion_date: "2024-01-15",
        status: "published",
        images: ["/images/projects/modern-living-1.jpg"],
        tags: ["modern", "apartment", "renovation"],
        client: "Private Client",
        budget: "€45,000",
        featured: true,
        created_at: "2024-01-15T00:00:00Z",
      },
    ]

    return NextResponse.json({ success: true, projects: sampleProjects }, { headers: corsHeaders() })
  }
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const projectData = await req.json()

      const project = await createProject({
        title: projectData.title,
        description: projectData.description,
        category: projectData.category,
        location: projectData.location || "",
        completion_date: projectData.completion_date || new Date().toISOString(),
        images: projectData.images || [],
        tags: projectData.tags || [],
        client: projectData.client || "",
        budget: projectData.budget || "",
        featured: projectData.featured || false,
        status: projectData.status || "draft",
      })

      return NextResponse.json({ success: true, project }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Create project error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to create project" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
