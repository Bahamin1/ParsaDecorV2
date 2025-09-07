import MobileNavTest from "@/components/mobile-nav-test"
import { getDictionary } from "../dictionaries"

export default async function TestMobileNavPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <MobileNavTest />
}
