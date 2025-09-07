import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real app, fetch from database
    const mockContact = {
      id,
      name: "John Doe",
      email: "john@example.com",
      phone: "+90 532 123 4567",
      subject: "Kitchen Renovation",
      message:
        "I would like to renovate my kitchen with modern appliances and a contemporary design. My budget is around €25,000 and I'm looking to start the project in March.",
      service: "residential",
      language: "en",
      status: "new",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
    }

    return NextResponse.json(mockContact)
  } catch (error) {
    console.error("Get contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    // In a real app, update in database
    const updatedContact = {
      id,
      ...body,
      updated_at: new Date().toISOString(),
    }

    console.log("Updated contact:", updatedContact)

    return NextResponse.json({
      success: true,
      contact: updatedContact,
    })
  } catch (error) {
    console.error("Update contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In a real app, delete from database
    console.log("Deleted contact:", id)

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("Delete contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
