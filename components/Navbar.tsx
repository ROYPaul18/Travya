'use client'

import { login, logout } from '@/lib/auth-actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Session } from "next-auth"
import { PlaneTakeoff, LogOut, LogIn, Globe } from 'lucide-react'

const Navbar = ({ session }: { session: Session | null }) => {
    return (
        <nav className='bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl py-4 border-b border-blue-500/30 z-30'>
            <div className='container mx-auto flex justify-between items-center px-6 lg:px-8'>
                <Link href={"/"} className='flex items-center gap-3 group'>
                    <span className='text-2xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent'>
                        Tripsly
                    </span>
                </Link>
                
                <div className='flex items-center space-x-6'>
                    {session ? (
                        <>
                            <Link 
                                href={"/trips"} 
                                className='text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group'
                            >
                                <PlaneTakeoff />
                                My Trips
                            </Link>
                            
                            <Link 
                                href={"/globe"} 
                                className='text-blue-100 hover:text-white transition-colors duration-300 font-medium flex items-center gap-2 group'
                            >
                                <Globe />
                                Globe
                            </Link>

                            <button
                                className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 transition-all duration-300 font-medium"
                                onClick={logout}
                            >
                                <LogOut className='h-4 w-4' />
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white px-4 py-2 rounded-lg cursor-pointer backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 font-medium group"
                            onClick={login}
                        >
                            <LogIn className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
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
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar