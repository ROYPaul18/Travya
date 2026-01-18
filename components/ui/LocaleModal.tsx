"use client";

import { FC, useState } from "react";
import { useLocale, setLocaleInStorage } from "next-intlayer";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Languages, X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400'],
  subsets: ['latin'],
  style: 'italic'
});

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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}
                    className="px-2 py-2 flex items-center justify-between w-full cursor-pointer group outline-none hover:bg-neutral-50 rounded-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-950 group-hover:text-neutral-950 transition-colors">
                        Langues
                    </span>
                    <Languages className="h-3.5 w-3.5 stroke-[1px] text-neutral-300 group-hover:text-neutral-950 transition-colors" />
                </button>
            </DialogTrigger>

            <DialogContent className="bg-white border-none shadow-[0_30px_100px_rgba(0,0,0,0.1)] rounded-none max-w-md py-4 overflow-hidden">
                {/* Header du Modal */}
                <div className="relative px-12 pt-16 pb-8 border-b border-neutral-50 text-center">
                    <DialogClose className="absolute top-6 right-6 text-neutral-300 hover:text-neutral-950 transition-colors">
                        <X className="h-5 w-5 stroke-[1px]" />
                    </DialogClose>
                    
                    <DialogTitle className={`${cormorant.className} text-4xl text-neutral-950 mb-2 font-light`}>
                        Sélection de la langue
                    </DialogTitle>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
                        Votre expérience personnalisée
                    </p>
                </div>

                {/* Liste des langues */}
                <div className="divide-y divide-neutral-50">
                    {availableLocales.map((localeItem) => (
                        <button
                            key={localeItem}
                            onClick={() => handleChange(localeItem)}
                            className={`
                                w-full flex items-center justify-between px-12 py-6 
                                transition-all duration-500 group
                                ${locale === localeItem ? "bg-neutral-50" : "hover:bg-neutral-100"}
                            `}
                        >
                            <div className="flex flex-col items-start">
                                <span className={`text-sm tracking-widest uppercase ${locale === localeItem ? "font-bold text-neutral-950" : "text-neutral-600 group-hover:text-neutral-950"}`}>
                                    {getLocaleName(localeItem, locale)}
                                </span>
                                <span className="text-[10px] text-neutral-400 font-light mt-1">
                                    {getLocaleName(localeItem, localeItem)}
                                </span>
                            </div>
                            
                            {locale === localeItem && (
                                <div className="size-1.5 bg-neutral-950 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer du Modal */}
                {/* <div className="px-12 py-8 bg-[#FAFAFA]">
                    <p className="text-[10px] text-neutral-400 font-light leading-relaxed italic text-center">
                        La devise et les contenus seront automatiquement adaptés <br /> à votre sélection linguistique.
                    </p>
                </div> */}
            </DialogContent>
        </Dialog>
    );
};