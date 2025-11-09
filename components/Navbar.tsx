"use client";

import React, { useState } from "react";
import { Link } from "@/components/Link";
import { Session } from "next-auth";
import {
  PlaneTakeoff,
  LogOut,
  LogIn,
  Globe,
  Group,
  Menu,
  X,
} from "lucide-react";
import { loginWithGithub, loginWithGoogle, logout } from "@/lib/auth-actions";
import { useIntlayer } from "next-intlayer";
import { LocaleSwitcher } from "./ui/LocaleSwitcher";

const Navbar = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const nav = useIntlayer("navbar");

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg py-4 border-b border-blue-500/30 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
      
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            Travya
          </span>
        </Link>

        {session && (
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
            {/* <Link
              href="/family"
              className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
            >
              <Group className="h-5 w-5" />
              {nav.family}
            </Link> */}
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          <LocaleSwitcher />
          {session ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg border border-red-400/30 hover:border-red-400/50 transition-all font-medium"
            >
              <LogOut className="h-4 w-4" />
              {nav.logoutText}
            </button>
          ) : (
            <>
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all font-medium"
              >
                <LogIn className="h-4 w-4" />
                {nav.loginGoogle}
              </button>
              <button
                onClick={loginWithGithub}
                className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all font-medium"
              >
                <LogIn className="h-4 w-4" />
                {nav.loginGithub}
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-blue-100 hover:text-white p-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 bg-blue-500/10 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label={nav.toggleMenu}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute left-0 top-full w-full bg-slate-900/95 backdrop-blur border-t border-blue-500/30 shadow-2xl">
          <div className="px-6 py-4 flex flex-col space-y-4">
            <LocaleSwitcher />
            {session ? (
              <>
                <Link
                  href="/trips"
                  className="text-blue-100 hover:text-white transition font-medium flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <PlaneTakeoff className="h-5 w-5" />
                  {nav.myTrips}
                </Link>
                <Link
                  href="/globe"
                  className="text-blue-100 hover:text-white transition font-medium flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Globe className="h-5 w-5" />
                  {nav.globe}
                </Link>
                <Link
                  href="/family"
                  className="text-blue-100 hover:text-white transition font-medium flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Group className="h-5 w-5" />
                  {nav.family}
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg border border-red-400/30 hover:border-red-400/50 transition-all font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  {nav.logoutText}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    loginWithGoogle();
                  }}
                  className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  {nav.signInGoogle}
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    loginWithGithub();
                  }}
                  className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  {nav.signInGithub}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;