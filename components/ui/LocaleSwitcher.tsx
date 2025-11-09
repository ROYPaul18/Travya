"use client"

import { FC } from "react"
import { useLocale, setLocaleInStorage } from "next-intlayer"
import {
  getLocaleName,
  getLocalizedUrl,
} from "intlayer"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale()
  const router = useRouter()

  const handleChange = (newLocale: string) => {
    
    setLocale(newLocale)
    setLocaleInStorage(newLocale)

    const newUrl = getLocalizedUrl(pathWithoutLocale, newLocale)
    router.push(newUrl)
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] bg-blue-500/10 border-blue-400/30 text-blue-100 hover:bg-blue-500/20 transition-all">
        <SelectValue placeholder={getLocaleName(locale)} />
      </SelectTrigger>
      <SelectContent>
        {availableLocales.map((localeItem) => (
          <SelectItem key={localeItem} value={localeItem}>
            {getLocaleName(localeItem, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
