import AdminDashboard from "@/components/admin/admin-dashboard"
import { Suspense } from "react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          </div>
        }
      >
        <AdminDashboard />
      </Suspense>
    </div>
  )
}
