"use client";

import { FC, useState } from "react";
import { useLocale, setLocaleInStorage } from "next-intlayer";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Languages, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export const LocaleModal: FC<{ currentLocale: string }> = ({ currentLocale }) => {
    const [open, setOpen] = useState(false);
    const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale();
    const router = useRouter();

    const handleChange = (newLocale: string) => {
        setLocale(newLocale);
        setLocaleInStorage(newLocale);
        const newUrl = getLocalizedUrl(pathWithoutLocale, newLocale);
        router.push(newUrl);
        setOpen(false);
    };

    const localeLabels: Record<string, string> = {
        fr: "Français",
        en: "English",
        es: "Español",
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                    className="cursor-pointer transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 rounded-sm mb-1"
                >
                    <div className="flex items-center gap-3 w-full">
                        <Languages />
                        <span className="text-gray-900 font-medium">Langues et devise</span>
                    </div>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className=" bg-white border border-gray-200 rounded-lg">
                <DialogClose asChild>
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <X className="h-5 w-5" />
                    </button>
                </DialogClose>

                <DialogTitle className="text-xl font-semibold text-gray-900">
                    Choisissez une langue
                </DialogTitle>
                <div className="grid grid-cols-3 gap-2">
                    {availableLocales.map((localeItem) => (
                        <Button
                            key={localeItem}
                            onClick={() => handleChange(localeItem)}
                            variant="ghost"
                            className={`
                w-full justify-between h-auto py-3 px-4 text-left
                transition-all duration-200 rounded-sm text-base
                ${locale === localeItem
                                    ? " hover:bg-gray-50 border border-black"
                                    : "hover:bg-gray-50 border border-transparent"
                                }
              `}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900">
                                    {getLocaleName(localeItem, locale)}
                                </span>

                                <span className="text-xs text-gray-500">
                                    {getLocaleName(localeItem, localeItem)}
                                </span>
                            </div>
                        </Button>
                    ))}
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        La devise sera automatiquement adaptée selon votre langue
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};