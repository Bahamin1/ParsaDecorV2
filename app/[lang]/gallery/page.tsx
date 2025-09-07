import ShockGallery from "../../../components/shock-gallery"
import { getDictionary } from "../dictionaries"

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as "en" | "tr" | "fa")

  return <ShockGallery lang={lang} dict={dict} />
}
