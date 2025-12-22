import React, { Suspense } from "react";
import { Link } from "@/components/Link";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { AuthButton } from "./AuthButton";
import { Skeleton } from "../ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { NavLink } from "./NavLink";
import { BurgerMenu } from "./BurgerMenu";
import Image from "next/image";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser();

  return (
    <nav className="relative bg-white sm:p-4 py-2 lg:py-2 border-b border-gray-200/50 z-50 font-button flex justify-center">
      <div className="flex justify-between items-center px-6 lg:px-28  w-full max-w-[1280px]">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center font-logo gap-2">
          <Image src="/logo.png" alt="Travya Logo" width={32} height={32} />
            <span className="text-base md:text-xl 2xl:text-2xl">
              Travya
            </span>
          </Link>
        </div>

        {user && (
          <div className="hidden md:flex items-center space-x-8 text-neutral-950 font-light text-sm">
            <NavLink href="/explore">Explore</NavLink>
            <NavLink href="/trips">{nav.myTrips}</NavLink>
            <NavLink href="/globe">{nav.globe}</NavLink>
          </div>
        )}

        <div className="flex items-center">
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
