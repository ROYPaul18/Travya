import React, { Suspense } from "react";
import { Link } from "@/components/Link";
import {
  PlaneTakeoff,
  Globe,
} from "lucide-react";
import { LocaleSwitcher } from "./ui/LocaleSwitcher";
import { AuthButton } from "./AuthButon";
import { Skeleton } from "./ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server"; // ✅ Import de getUser

interface PageProps {
  params: Promise<{ locale: string }>
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser(); // ✅ Récupérer l'utilisateur

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg py-4 border-b border-blue-500/30 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            Travya
          </span>
        </Link>

        {/* ✅ Afficher les liens seulement si l'utilisateur est connecté */}
        {user && (
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/trips"
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
            >
              <PlaneTakeoff className="h-5 w-5" />
              {nav.myTrips}
            </Link>
            <Link
              href="/globe"
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
            >
              <Globe className="h-5 w-5" />
              {nav.globe}
            </Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <LocaleSwitcher />
          <Suspense fallback={<Skeleton className="h-10 w-24" />}>
            <AuthButton locale={locale} />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};