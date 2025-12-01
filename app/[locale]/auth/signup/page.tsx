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
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Card className="bg-white border border-gray-200 shadow-xl mt-8 rounded-xl">
                    <CardHeader className="text-center space-y-2 pb-4 pt-6">
                        <CardTitle className="text-3xl font-bold text-gray-900">
                            {content.title}
                        </CardTitle>
                        <CardDescription className="text-gray-500 text-base">
                            {content.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <SignUpForm />
                    </CardContent>

                    <CardFooter className="flex justify-center pt-4 pb-6">
                        <p className="text-gray-500 text-sm">
                            {content.footerText}{" "}
                            <Link
                                href="/auth/signin"
                                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
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