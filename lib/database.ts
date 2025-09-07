import { supabaseAdmin } from "./supabase"

export interface Project {
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
  updated_at?: string
}

export interface Media {
  id: string
  filename: string
  url: string
  type: "image" | "video" | "document"
  size: number
  uploaded_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status: "new" | "read" | "replied"
  created_at: string
}

// Project operations
export async function getProjects(filters?: {
  category?: string
  featured?: boolean
  status?: "draft" | "published"
  limit?: number
  offset?: number
}) {
  try {
    let query = supabaseAdmin.from("projects").select("*")

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured)
    }
    if (filters?.status) {
      query = query.eq("status", filters.status)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`)
    }

    return data as Project[]
  } catch (error) {
    console.error("Database error:", error)
    // Return empty array as fallback
    return []
  }
}

export async function getProjectById(id: string) {
  try {
    const { data, error } = await supabaseAdmin.from("projects").select("*").eq("id", id).single()

    if (error) {
      throw new Error(`Failed to fetch project: ${error.message}`)
    }

    return data as Project
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`)
    }

    return data as Project
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function updateProject(id: string, updates: Partial<Project>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update project: ${error.message}`)
    }

    return data as Project
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`)
    }
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Media operations
export async function getMedia(type?: "image" | "video" | "document") {
  try {
    let query = supabaseAdmin.from("media").select("*")

    if (type) {
      query = query.eq("type", type)
    }

    query = query.order("uploaded_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch media: ${error.message}`)
    }

    return data as Media[]
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function createMedia(media: Omit<Media, "id" | "uploaded_at">) {
  try {
    const { data, error } = await supabaseAdmin
      .from("media")
      .insert({
        ...media,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create media: ${error.message}`)
    }

    return data as Media
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function deleteMedia(id: string) {
  try {
    const { error } = await supabaseAdmin.from("media").delete().eq("id", id)

    if (error) {
      throw new Error(`Failed to delete media: ${error.message}`)
    }
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

// Contact message operations
export async function getContactMessages(status?: "new" | "read" | "replied") {
  try {
    let query = supabaseAdmin.from("contact_messages").select("*")

    if (status) {
      query = query.eq("status", status)
    }

    query = query.order("created_at", { ascending: false })

    const { data, error } = await query

    if (error) {
      throw new Error(`Failed to fetch contact messages: ${error.message}`)
    }

    return data as ContactMessage[]
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

export async function createContactMessage(message: Omit<ContactMessage, "id" | "created_at" | "status">) {
  try {
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        ...message,
        status: "new",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create contact message: ${error.message}`)
    }

    return data as ContactMessage
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export async function updateContactMessageStatus(id: string, status: "new" | "read" | "replied") {
  try {
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update contact message: ${error.message}`)
    }

    return data as ContactMessage
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}
