import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
export { generateStaticParams } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";


const geist = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora'
})

export const metadata: Metadata = {
  title: "Travya – Carnets de voyage interactifs",
  description: "Travya est une application web pour planifier, documenter et revivre ses voyages grâce à des carnets numériques collaboratifs et une visualisation 3D du globe.",
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
              data-domain="travya.vercel.app"
              src="https://datafa.st/js/script.js">
            </script>
          </head>
          <body
            className={`${geist.variable} antialiased`}
          >
            
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