import "server-only"

const dictionaries = {
  fa: () => import("./dictionaries/fa.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  tr: () => import("./dictionaries/tr.json").then((module) => module.default),
}

export const getDictionary = async (locale: "fa" | "en" | "tr") => {
  // Default to Persian if locale is not supported
  return dictionaries[locale]?.() ?? dictionaries.fa()
}
