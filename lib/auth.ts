import { supabaseAdmin } from "./supabase"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function hashPassword(password: string) {
  // In production, use bcrypt or similar
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function verifyPassword(password: string, hash: string) {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

export async function createUser(email: string, password: string, role = "admin") {
  try {
    const hashedPassword = await hashPassword(password)

    const { data, error } = await supabaseAdmin
      .from("users")
      .insert({
        email,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Create user error:", error)
    throw error
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("email", email).single()

    if (error || !user) {
      throw new Error("User not found")
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      throw new Error("Invalid password")
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Authentication error:", error)
    throw error
  }
}
