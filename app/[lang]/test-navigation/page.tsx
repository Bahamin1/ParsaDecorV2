import NavigationTestComponent from "@/components/navigation-test-component"
import { getDictionary } from "../dictionaries"

export default async function TestNavigationPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <NavigationTestComponent />
}
