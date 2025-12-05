import React, { Suspense } from "react";
import { Link } from "@/components/Link";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { AuthButton } from "./AuthButton";
import { Skeleton } from "../ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { NavLink } from "./NavLink";
import { BurgerMenu } from "./BurgerMenu";

interface PageProps {
  params: Promise<{ locale: string }>
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser();

  return (
    <nav className="relative bg-white py-2 lg:py-6 border-b border-gray-200/50 z-50 font-button">
      <div className="flex justify-between items-center px-6 lg:px-24">

        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-normal text-green-950 bg-clip-text">
            Travya
          </span>
        </Link>

        {/* Navigation desktop */}
        {user && (
          <div className="hidden md:flex items-center space-x-10 text-neutral-950 font-light">
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/trips">{nav.myTrips}</NavLink>
            <NavLink href="/globe">{nav.globe}</NavLink>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <LocaleSwitcher />
            <Suspense fallback={<Skeleton className="h-10 w-24" />}>
              <AuthButton locale={locale} />
            </Suspense>
          </div>

          <div className="md:hidden">
            {user ? (
              <BurgerMenu locale={locale} nav={nav} user={user} />
            ) : (
              <Suspense fallback={<Skeleton className="h-10 w-24" />}>
                <AuthButton locale={locale} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};