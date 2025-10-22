import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl py-4 border-b border-blue-500/30 z-30">
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">Triply</span>
                </div>
                <p className="text-blue-200/60 text-sm">
                    © 2025 Triply. Start your journey today.
                </p>
            </div>
        </footer>
    )
}

export default Footer