import { Link } from "@/components/Link"
import { SignInForm } from "./signin-form"
import { useIntlayer } from "next-intlayer/server"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SignInPage({ params }: PageProps) {
    const { locale } = await params
    const content = useIntlayer('signin-page', locale)

    return (
        <div className=" bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md mt-8">
                
                <div className="bg-white border border-gray-300 rounded-sm p-8">
                    
                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl font-light text-gray-900">
                            {content.title}
                        </h1>
                        <p className="text-gray-600 text-sm font-light">
                            {content.description}
                        </p>
                    </div>
                    <SignInForm />
                    <div className="flex justify-center pt-6 mt-6 border-t border-gray-200">
                        <p className="text-gray-600 text-sm font-light">
                            {content.footerText}{" "}
                            <Link
                                href="/auth/signup"
                                className="text-green-950 hover:text-green-900 font-medium transition-colors"
                            >
                                {content.signupLink}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}