import { Link } from "@/components/Link"
import { SignUpForm } from "./signup-form"
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
                {/* Suppression de la Card - Contenu direct */}
                <div className="bg-white border border-gray-300 rounded-sm p-8 mt-8">
                    {/* Header */}
                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl font-light text-gray-900">
                            {content.title}
                        </h1>
                        <p className="text-gray-600 text-sm font-light">
                            {content.description}
                        </p>
                    </div>

                    {/* Form */}
                    <SignUpForm />

                    {/* Footer */}
                    <div className="flex justify-center pt-6 mt-6 border-t border-gray-200">
                        <p className="text-gray-600 text-sm font-light">
                            {content.footerText}{" "}
                            <Link
                                href="/auth/signin"
                                className="text-neutral-900 hover:text-neutral-800 font-medium transition-colors"
                            >
                                {content.loginLink}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}