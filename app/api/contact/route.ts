import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, subject, message } = body

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create contact record
    const contactData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      service: body.service || "",
      language: body.language || "en",
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // In a real app, save to database
    // For now, just log it
    console.log("New contact submission:", contactData)

    // Send email notification (in real app)
    // await sendEmailNotification(contactData)

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        id: contactData.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real app, fetch from database
    const mockContacts = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+90 532 123 4567",
        subject: "Kitchen Renovation",
        message: "I would like to renovate my kitchen...",
        service: "residential",
        language: "en",
        status: "new",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T10:30:00Z",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+90 532 987 6543",
        subject: "Office Design",
        message: "We need help with our office space...",
        service: "commercial",
        language: "en",
        status: "read",
        created_at: "2024-01-14T14:20:00Z",
        updated_at: "2024-01-14T15:00:00Z",
      },
    ]

    let filteredContacts = mockContacts
    if (status && status !== "all") {
      filteredContacts = mockContacts.filter((contact) => contact.status === status)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex)

    return NextResponse.json({
      contacts: paginatedContacts,
      total: filteredContacts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredContacts.length / limit),
    })
  } catch (error) {
    console.error("Get contacts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
