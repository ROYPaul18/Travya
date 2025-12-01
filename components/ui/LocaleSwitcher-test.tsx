"use client";

import { FC } from "react";
import { useLocale, setLocaleInStorage } from "next-intlayer";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/******************************************************
 * LOCALE SWITCHER – Harmonisé avec Navbar & AuthButton
 ******************************************************/

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    setLocale(newLocale);
    setLocaleInStorage(newLocale);

    const newUrl = getLocalizedUrl(pathWithoutLocale, newLocale);
    router.push(newUrl);
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        className="w-[110px] h-10 rounded-lg border border-slate-300 bg-white shadow-sm text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <SelectValue placeholder={getLocaleName(locale)} />
      </SelectTrigger>

      <SelectContent className="bg-white border border-slate-200 shadow-lg rounded-xl text-slate-700">
        {availableLocales.map((localeItem) => (
          <SelectItem
            key={localeItem}
            value={localeItem}
            className="cursor-pointer hover:bg-slate-100 rounded-md"
          >
            {getLocaleName(localeItem, locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};