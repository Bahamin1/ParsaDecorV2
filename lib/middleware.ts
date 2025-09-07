import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }
}

export async function withAdminAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: any) => Promise<NextResponse>,
) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401, headers: corsHeaders() },
      )
    }

    const token = authHeader.substring(7)
    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401, headers: corsHeaders() })
    }

    return await handler(request, payload)
  } catch (error) {
    console.error("Auth middleware error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 401, headers: corsHeaders() })
  }
}

export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error("API Error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders() })
    }
  }
}
