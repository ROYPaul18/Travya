import { Link } from "@/components/Link"
import { SignUpForm } from "./signup-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useIntlayer } from "next-intlayer/server"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SignUpPage({ params }: PageProps) {
    const { locale } = await params
    const content = useIntlayer('signup-page', locale)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader className="text-center space-y-2 pb-4">
                        <CardTitle className="text-2xl font-bold text-white">
                            {content.title}
                        </CardTitle>
                        <CardDescription className="text-blue-200/70">
                            {content.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <SignUpForm />
                    </CardContent>

                    <CardFooter className="flex justify-center pt-4">
                        <p className="text-blue-200/70 text-sm">
                            {content.footerText}{" "}
                            <Link
                                href="/auth/signin"
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                {content.loginLink}
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}