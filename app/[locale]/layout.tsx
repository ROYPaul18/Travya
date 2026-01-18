import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export { generateStaticParams } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import Script from "next/script";
import { Toaster } from "sonner";


const geist = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora'
})

export const metadata: Metadata = {
  title: "SILLAGE – Carnets de voyage interactifs",
  description: "SILLAGE est une application web pour planifier, documenter et revivre ses voyages grâce à des carnets numériques collaboratifs et une visualisation 3D du globe.",
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {

  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <html lang={locale} dir={getHTMLTextDir(locale)}>
          <head>
            <script
              defer
              data-website-id="dfid_TIzTjs4vrqlS6RP70Hmqq"
              data-domain="https://sillages.vercel.app"
              src="https://datafa.st/js/script.js">
            </script>
          </head>
          <body
            className={`${geist.variable} antialiased`}
          >
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
              strategy="beforeInteractive"
            />
            <Toaster
              position="top-right"
              toastOptions={{
                className: "font-logo border-none shadow-xl", // Ta police de base
                style: {
                  borderRadius: '0px', // Un look plus éditorial/galerie
                  background: '#fffdfa', // Un blanc cassé/papier pour la DA
                  color: '#1a1a1a',
                },
                classNames: {
                  title: "font-logo italic text-lg",
                  description: "text-muted-foreground font-light",
                  actionButton: "bg-black text-white rounded-none",
                  cancelButton: "bg-gray-100 rounded-none",
                },
              }}
            />
            <Navbar params={params} />

            {children}
            <Footer />
          </body>
        </html>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default LocaleLayout;