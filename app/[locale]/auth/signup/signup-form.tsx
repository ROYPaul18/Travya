"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUp, signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useIntlayer, useLocale } from "next-intlayer"
import { Github, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SignUpFormSchema = z.object({
    name: z.string().min(2, "Nom trop court"),
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
})

type ProviderEnum = Parameters<typeof signIn.social>[0]["provider"]

export const SignUpForm = () => {
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: { name: "", email: "", password: "" },
    })

    const router = useRouter()
    const { locale } = useLocale()
    const content = useIntlayer('signup-form')

    const inputStyle = cn(
        "bg-transparent border-0 border-b border-gray-200 text-gray-900",
        "placeholder:text-gray-300 rounded-none h-12 px-0 shadow-none",
        "focus-visible:ring-0 focus-visible:border-black transition-colors duration-300 font-light"
    )

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        await signUp.email(
            {
                email: values.email,
                name: values.name,
                password: values.password,
            },
            {
                onSuccess: () => {
                    toast.success("Inscription réussie")
                    router.push(`/${locale}`)
                    router.refresh()
                },
                onError: (error) => {
                    toast.error(error.error.message)
                },
            }
        )
    }

    async function signInWithProvider(provider: ProviderEnum) {
        await signIn.social(
            {
                provider: provider,
                callbackURL: "/"
            },
            {
                onSuccess: () => { },
                onError: (error) => {
                    toast.error(error.error.message)
                },
            }
        )
    }

    return (
        <div className="w-full max-w-[400px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                        {content.labels.name}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={content.placeholders.name.value}
                                            className={inputStyle}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] text-red-400 font-light" />
                                </FormItem>
                            )}
                        />

                        {/* Champ EMAIL */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                        {content.labels.email}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder={content.placeholders.email.value}
                                            className={inputStyle}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] text-red-400 font-light" />
                                </FormItem>
                            )}
                        />

                        {/* Champ MOT DE PASSE */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                        {content.labels.password}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder={content.placeholders.password.value}
                                            className={inputStyle}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] text-red-400 font-light" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-none h-14 flex items-center justify-center gap-2 transition-all mt-10"
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>{content.buttons.submitting}</span>
                            </>
                        ) : (
                            content.buttons.submit
                        )}
                    </Button>
                </form>
            </Form>

            {/* Séparateur Minimaliste */}
            <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full h-1px bg-gray-100"></span>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 bg-white">
                        {content.divider}
                    </span>
                </div>
            </div>

            {/* Boutons Sociaux Épurés */}
            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    onClick={() => signInWithProvider("github")}
                    variant="outline"
                    className="w-full bg-transparent border-gray-100 hover:bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-none h-12 gap-3 transition-colors"
                >
                    <Github className="h-4 w-4" />
                    GitHub
                </Button>

                <Button
                    type="button"
                    onClick={() => signInWithProvider("google")}
                    variant="outline"
                    className="w-full bg-transparent border-gray-100 hover:bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-none h-12 gap-3 transition-colors"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" opacity="0.4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" opacity="0.4" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" opacity="0.4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </Button>
            </div>
        </div>
    )
}