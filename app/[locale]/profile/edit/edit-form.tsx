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
import { authClient, signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useLocale } from "next-intlayer"
import { Loader2 } from "lucide-react"

const EditFormSchema = z.object({
  name: z.string(),
  image: z.string().nullable()
})

export const EditForm = (props: {
  defaultValue: z.infer<typeof EditFormSchema>
}) => {
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: props.defaultValue,
  })

  const router = useRouter()
  const { locale } = useLocale()

  async function onSubmit(values: z.infer<typeof EditFormSchema>) {
    await authClient.updateUser(
      {
        name: values.name,
        image: values.image,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col text-white"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-blue-100">Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Alex Dupont"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 rounded-2xl h-11 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-300 text-sm mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-blue-100">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 rounded-2xl h-11 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-red-300 text-sm mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-2xl h-11 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/40"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Création...</span>
            </>
          ) : (
            "Valider"
          )}
        </Button>
      </form>
    </Form>
  )
}
