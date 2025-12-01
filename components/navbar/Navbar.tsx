import React, { Suspense } from "react";
import { Link } from "@/components/Link";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { AuthButton } from "./AuthButton";
import { Skeleton } from "../ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";

interface PageProps {
  params: Promise<{ locale: string }>
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser();

  return (
    <nav className="relative bg-white py-4 border-b border-gray-200/50 z-50 font-button">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-neutral-950 bg-clip-text">
            Travya
          </span>
        </Link>

        {user && (
          <div className="hidden md:flex items-center space-x-10 text-neutral-950">
            <Link
              href="/explore"
              className="hover:text-neutral-500 transition-colors duration-300 font-medium flex items-center gap-2"
            >
              Explore
            </Link>
            <Link
              href="/trips"
              className=" hover:text-neutral-500 transition-colors duration-300 font-medium flex items-center gap-2"
            >

              {nav.myTrips}
            </Link>
            <Link
              href="/globe"
              className="hover:text-neutral-500 transition-colors duration-300 font-medium flex items-center gap-2"
            >

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