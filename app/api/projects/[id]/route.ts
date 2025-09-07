import { type NextRequest, NextResponse } from "next/server"
import { getProjectById, updateProject, deleteProject } from "@/lib/database"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const project = await getProjectById(id)

    return NextResponse.json({ success: true, project }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get project error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch project" },
      { status: 404, headers: corsHeaders() },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { id } = await params
      const updates = await req.json()
      const project = await updateProject(id, updates)

      return NextResponse.json({ success: true, project }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Update project error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to update project" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { id } = await params
      await deleteProject(id)

      return NextResponse.json({ success: true, message: "Project deleted successfully" }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Delete project error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to delete project" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
