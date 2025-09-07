import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { createMedia } from "@/lib/database"
import { withAdminAuth, corsHeaders } from "@/lib/middleware"

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      const formData = await req.formData()
      const file = formData.get("file") as File

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400, headers: corsHeaders() })
      }

      // Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "application/pdf"]
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400, headers: corsHeaders() })
      }

      if (file.size > maxSize) {
        return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400, headers: corsHeaders() })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      const filePath = `uploads/${filename}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(filePath, file)

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath)

      // Determine file type
      let type: "image" | "video" | "document" = "document"
      if (file.type.startsWith("image/")) type = "image"
      else if (file.type.startsWith("video/")) type = "video"

      // Save to database
      const media = await createMedia({
        filename: file.name,
        url: urlData.publicUrl,
        type,
        size: file.size,
      })

      return NextResponse.json({ success: true, media }, { headers: corsHeaders() })
    } catch (error: any) {
      console.error("Upload error:", error)
      return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500, headers: corsHeaders() })
    }
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
