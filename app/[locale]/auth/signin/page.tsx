import { Link } from "@/components/Link";
import { SignInForm } from "./signin-form";
import { useIntlayer } from "next-intlayer/server";
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400'],
  subsets: ['latin'],
  style: ["italic"]
});

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignInPage({ params }: PageProps) {
  const { locale } = await params;
  const content = useIntlayer("signin-page", locale);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="w-full max-w-[400px] py-12">
        
        {/* Header Style DA Bali */}
        <div className="text-center mb-16 space-y-4">
          <h1 className={`${cormorant.className} text-5xl md:text-6xl italic leading-tight text-gray-900`}>
            {content.title}
          </h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {content.description}
          </p>
        </div>

        <SignInForm />

        {/* Footer avec lien vers Signup */}
        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-[11px] font-light tracking-wide">
            {content.footerText}{" "}
            <Link
              href="/auth/signup"
              className="text-black font-bold uppercase tracking-widest ml-2 hover:underline underline-offset-4 transition-all"
            >
              {content.signupLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}