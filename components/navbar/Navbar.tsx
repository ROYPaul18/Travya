import { Suspense } from "react";
import { Link } from "@/components/Link";

import { AuthButton } from "./AuthButton";
import { Skeleton } from "../ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { NavLink } from "./NavLink";
import { BurgerMenu } from "./BurgerMenu";


interface PageProps {
  params: Promise<{ locale: string }>;
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser();

  return (
    <nav className="absolute top-0 w-full z-1000 py-4 px-[5%] flex justify-between items-center bg-white border-b border-gray-200">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link href="/" className="flex items-center font-logo gap-2">
            <span className="text-base md:text-xl xl:text-[24px] 2xl:text-4xl font-logo tracking-wide font-light">
              SILLAGE
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-12">
          {user && (
            <div className="hidden md:flex items-center space-x-8 2xl:space-x-16 text-black font-medium text-xs 2xl:text-base font-nav">
              <NavLink href="/explore">Explore</NavLink>
              <NavLink href="/trips">{nav.myTrips}</NavLink>
            </div>
          )}
          <div className="hidden md:flex items-center space-x-4">
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