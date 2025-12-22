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
import { Link } from "@/components/Link"

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

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        await signUp.email(
            {
                email: values.email,
                name: values.name,
                password: values.password,
            },
            {
                onSuccess: () => {
                    toast.success("Inscription réussie 🎉")
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
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-900 text-sm font-light">
                                    {content.labels.name}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={content.placeholders.name.value}
                                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-sm h-11 px-4 focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition font-light"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs font-light" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-900 text-sm font-light">
                                    {content.labels.email}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={content.placeholders.email.value}
                                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-sm h-11 px-4 focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition font-light"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs font-light" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-900 text-sm font-light">
                                    {content.labels.password}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={content.placeholders.password.value}
                                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-sm h-11 px-4 focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition font-light"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs font-light" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-green-950 hover:bg-green-900 text-white font-medium rounded-sm h-11 flex items-center justify-center gap-2 transition-all duration-200 mt-6"
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

            <div className="relative my-6">
                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-4 text-gray-500 text-xs font-light uppercase tracking-wider bg-white">
                        {content.divider}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    onClick={() => signInWithProvider("github")}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium rounded-sm h-11 gap-2 transition-all"
                    variant="outline"
                >
                    <Github className="h-5 w-5" />
                    GitHub
                </Button>

                <Button
                    type="button"
                    onClick={() => signInWithProvider("google")}
                    className="w-full bg-white hover:bg-gray-50 text-neutral-800 border border-gray-300 font-medium rounded-sm h-11 gap-2 transition-all"
                    variant="outline"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </Button>
            </div>
        </div>
    )
}