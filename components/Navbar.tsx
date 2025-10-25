"use client";

import { loginWithGithub, loginWithGoogle, logout } from "@/lib/auth-actions";
import Link from "next/link";
import React, { useState } from "react";
import { Session } from "next-auth";
import { PlaneTakeoff, LogOut, LogIn, Globe, UsersRound } from "lucide-react";

const Navbar = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl py-4 border-b border-blue-500/30 z-100">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-3 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            Travya
          </span>
        </Link>

        <button
          className="md:hidden text-blue-100 hover:text-white transition-colors duration-300 p-2 rounded-lg border border-blue-400/30 hover:border-blue-400/50 bg-blue-500/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <PlaneTakeoff className="h-6 w-6" />
        </button>

        <div className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <Link
                href={"/trips"}
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group"
              >
                <PlaneTakeoff />
                My Trips
              </Link>

              <Link
                href={"/globe"}
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group"
              >
                <Globe />
                Globe
              </Link>

              <Link
                href={"/family"}
                className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group"
              >
                <UsersRound />
                Family
              </Link>

              <button
                className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 transition-all duration-300 font-medium"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <button
                className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 font-medium group"
                onClick={loginWithGoogle}
              >
                <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Sign In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 129 131"
                  fill="currentColor"
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                >
                  <path
                    d="M65.4062 53.5151V78.8456H100.607C99.0614 86.9918 94.4229 93.8895 87.466 98.5274L108.694 114.998C121.061 103.582 128.197 86.8139 128.197 66.8945C128.197 62.2567 127.781 57.7967 127.008 53.5158L65.4062 53.5151Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M28.7504 77.8569L23.9628 81.5218L7.01611 94.7219C17.7785 116.068 39.837 130.815 65.4051 130.815C83.0646 130.815 97.8702 124.988 108.692 114.998L87.4649 98.5276C81.6376 102.452 74.2049 104.831 65.4051 104.831C48.3993 104.831 33.9507 93.3548 28.7772 77.8947L28.7504 77.8569Z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.0159 36.0928C2.55656 44.8927 0 54.8228 0 65.4067C0 75.9906 2.55656 85.9208 7.0159 94.7207C7.0159 94.7797 28.779 77.8337 28.779 77.8337C27.4709 73.9093 26.6977 69.7473 26.6977 65.406C26.6977 61.0648 27.4709 56.9028 28.779 52.9784L7.0159 36.0928Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M65.4064 26.044C75.0392 26.044 83.6015 29.3737 90.4395 35.7956L109.17 17.0656C97.8125 6.48167 83.0666 0 65.4064 0C39.8383 0 17.7785 14.6869 7.01611 36.0929L28.7786 52.9799C33.9514 37.5199 48.4006 26.044 65.4064 26.044Z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 font-medium group"
                onClick={loginWithGithub}
              >
                <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Sign In
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {open && (
          <div className="md:hidden absolute left-0 top-full w-full bg-slate-900/95 backdrop-blur border-t border-blue-500/30 shadow-2xl">
            <div className="px-6 py-4 flex flex-col space-y-4">
              {session ? (
                <>
                  <Link
                    href={"/trips"}
                    className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <PlaneTakeoff />
                    My Trips
                  </Link>
                  <Link
                    href={"/globe"}
                    className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <Globe />
                    Globe
                  </Link>
                  <Link
                    href={"/family"}
                    className="text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <UsersRound />
                    Family
                  </Link>
                  <button
                    className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 transition-all duration-300 font-medium"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div>
                  <button
                    className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 font-medium"
                    onClick={() => {
                      setOpen(false);
                      loginWithGoogle();
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 font-medium"
                    onClick={() => {
                      setOpen(false);
                      loginWithGithub();
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
