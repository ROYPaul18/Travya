import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import Footer from "@/components/Footer";
export { generateStaticParams } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travya – Carnets de voyage interactifs",
  description: "Travya est une application web pour planifier, documenter et revivre ses voyages grâce à des carnets numériques collaboratifs et une visualisation 3D du globe.",
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const session = await auth();
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <html lang={locale} dir={getHTMLTextDir(locale)}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar session={session} />
            {children}
            <Footer />
          </body>
        </html>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default LocaleLayout;