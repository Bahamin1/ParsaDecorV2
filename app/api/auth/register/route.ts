import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { corsHeaders } from "@/lib/middleware"

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminKey } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400, headers: corsHeaders() })
    }

    // Check admin registration key for admin accounts
    const isAdminRegistration = adminKey === process.env.ADMIN_REGISTRATION_KEY
    const role = isAdminRegistration ? "admin" : "user"

    if (role === "admin" && !isAdminRegistration) {
      return NextResponse.json({ error: "Invalid admin registration key" }, { status: 403, headers: corsHeaders() })
    }

    const user = await createUser(email, password, role)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { headers: corsHeaders() },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 400, headers: corsHeaders() })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders() })
}
