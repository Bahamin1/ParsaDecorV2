import AdminHeroSettings from "@/components/admin/admin-hero-settings"

export default function HeroSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900" dir="rtl">
          تنظیمات Hero Section
        </h1>
      </div>
      <AdminHeroSettings />
    </div>
  )
}
