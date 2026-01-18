import { Suspense } from "react";
import { Link } from "@/components/Link";
import { AuthButton } from "./AuthButton";
import { Skeleton } from "../ui/skeleton";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";
import { NavLink } from "./NavLink";
import { MobileTabBar } from "./MobileTabBar"; // Import du nouveau composant

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const Navbar = async ({ params }: PageProps) => {
  const { locale } = await params;
  const nav = useIntlayer("navbar", locale);
  const user = await getUser();

  return (
    <>
      <nav className="fixed w-full z-100 px-6 py-4 lg:px-24 sm:px-6  mx-auto flex justify-between items-center bg-white border-b border-gray-200/50">
        <Link href="/" className="flex items-center">
          <span className="text-xl xl:text-[24px] font-logo tracking-widest font-light">
            SILLAGE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {user && (
            <div className="flex items-center space-x-12 text-[10px] uppercase tracking-[0.2em] font-bold">
              <NavLink href="/explore">Explore</NavLink>
              <NavLink href="/trips">{nav.myTrips}</NavLink>
            </div>
          )}
          <Suspense fallback={<Skeleton className="h-10 w-24" />}>
            <AuthButton locale={locale} />
          </Suspense>
        </div>
      </nav>


        <MobileTabBar nav={nav} isAuthenticated={!!user} />
    </>
  );
};