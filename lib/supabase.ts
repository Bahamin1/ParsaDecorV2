import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Server-side Supabase client with service role
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          location: string
          completion_date: string
          status: "draft" | "published"
          images: string[]
          tags: string[]
          client: string
          budget: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: "new" | "read" | "replied"
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["contact_messages"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          status: "active" | "unsubscribed"
          subscribed_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["newsletter_subscribers"]["Row"], "id">
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          project_type: string
          budget: string | null
          timeline: string | null
          description: string
          location: string | null
          status: "new" | "reviewed" | "quoted" | "closed"
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["quote_requests"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["quote_requests"]["Insert"]>
      }
      users: {
        Row: {
          id: string
          email: string
          password: string
          role: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["users"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>
      }
    }
  }
}
