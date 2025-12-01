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
      <SelectTrigger className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium cursor-pointer">
        <SelectValue placeholder={getLocaleName(locale)} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 text-gray-900 shadow-xl rounded-sm">
        {availableLocales.map((localeItem) => (
          <SelectItem 
            key={localeItem} 
            value={localeItem}
            className="hover:!bg-gray-100 outline-none cursor-pointer transition-colors duration-200 font-medium"
          >
            {getLocaleName(localeItem, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}