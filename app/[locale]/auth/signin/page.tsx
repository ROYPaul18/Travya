import { Link } from "@/components/Link"
import { SignInForm } from "./signin-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useIntlayer } from "next-intlayer/server"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SignInPage({ params }: PageProps) {

    const { locale } = await params
    const content = useIntlayer('signin-page', locale)
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-2">
                <Card className="bg-white border border-gray-200 mt-8 rounded-xl">
                    <CardHeader className="text-center space-y-2 pb-4 pt-6">
                        {/* Titre en noir */}
                        <CardTitle className="text-3xl font-bold text-gray-900">
                            {content.title}
                        </CardTitle>
                        {/* Description en gris neutre */}
                        <CardDescription className="text-gray-500 text-base">
                            {content.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <SignInForm />
                    </CardContent>

                    <CardFooter className="flex justify-center pt-4 pb-6">
                        {/* Texte du pied de page en gris neutre */}
                        <p className="text-gray-500 text-sm">
                            {content.footerText}{" "}
                            <Link
                                href="/auth/signup"
                                // Lien d'accentuation en gris foncé, hover léger
                                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                            >
                                {content.signupLink}
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}