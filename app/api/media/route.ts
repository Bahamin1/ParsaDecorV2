import { type NextRequest, NextResponse } from "next/server"
import { getMedia, deleteMedia } from "@/lib/database"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "image" | "video" | "document" | null

    const media = await getMedia(type || undefined)

    return NextResponse.json({ success: true, media }, { headers: corsHeaders() })
  } catch (error: any) {
    console.error("Get media error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch media" },
      { status: 500, headers: corsHeaders() },
    )
  }
}

export async function DELETE(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const id = searchParams.get("id")

      if (!id) {
        return NextResponse.json({ error: "Media ID is required" }, { status: 400, headers: corsHeaders() })
      }

      await deleteMedia(id)

      return NextResponse.json({ success: true, message: "Media deleted successfully" }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Delete media error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to delete media" },
        { status: 500, headers: corsHeaders() },
      )
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
