"use client"

import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to Persian (Farsi) as default language
  redirect("/fa")
}
