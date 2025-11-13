"use client"
import { Link } from "@/components/Link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignUpPage() {

    const router = useRouter();
    async function onSubmit(formData: FormData) {
        const email = formData.get("email")
        await authClient.forgetPassword(
            {
                email: String(email),
                redirectTo: "/reset-password"
            },
            {
                onSuccess: () => {
                    router.push(`/`)
                    router.refresh()
                },
                onError: (error) => {
                    toast.error(error.error.message)
                },
            }
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent mt-6">
                    Reset Password
                </h1>
                <p>
                    To reset your password, enter the email address associated with your account.
                    We will send you an email with a link to reset your password.
                </p>

                <form className="flex flex-col gap-4" action={onSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <Input type="email"></Input>
                    </div>
                    <Button type="submit"> Reset Password</Button>
                </form>
            </div>
        </div>
    )
}
