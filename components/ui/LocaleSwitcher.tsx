"use client"

import { FC } from "react"
import { useLocale, setLocaleInStorage } from "next-intlayer"
import { getLocaleName, getLocalizedUrl } from "intlayer"
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
      <SelectTrigger className="w-auto gap-1  bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-500 transition-all text-[13px] font-medium h-8 px-2">
        <SelectValue placeholder={locale} />
      </SelectTrigger>
      <SelectContent className="  text-zinc-400 hover:text-zinc-500 rounded-lg min-w-[120px]">
        {availableLocales.map((localeItem) => (
          <SelectItem 
            key={localeItem} 
            value={localeItem}
            className="focus:bg-white/10 focus:text-white cursor-pointer transition-colors duration-200 text-[13px] hover:text-zinc-500"
          >
            {getLocaleName(localeItem, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}