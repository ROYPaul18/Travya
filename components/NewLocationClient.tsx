"use client"

import { useTransition } from "react"
import { Button } from "./ui/button"
import { addLocation } from "@/lib/actions/addLocation"
import { MapPin, Loader2 } from "lucide-react"

export default function NewLocation({ tripId }: { tripId: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto px-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-8 shadow-2xl rounded-2xl border border-white/20">
                    {/* Header avec icône */}
                    <div className="text-center mb-8 space-y-4">
                        <div className="inline-flex items-center justify-center bg-blue-500/20 p-4 rounded-full mb-2">
                            <MapPin className="h-10 w-10 text-blue-300" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                            Add New Location
                        </h1>
                        <p className="text-blue-200/80">Pin your next destination on the map</p>
                    </div>

                    {/* Form */}
                    <form 
                        className="space-y-6" 
                        action={(formData: FormData) => {
                            startTransition(() => {
                                addLocation(formData, tripId)
                            })
                        }}
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-300" />
                                Address
                            </label>
                            <input 
                                name="address" 
                                type="text" 
                                required 
                                placeholder="Enter location address..."
                                className="w-full bg-white/5 border border-white/20 text-white placeholder-blue-200/50 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300" 
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Adding Location...
                                </>
                            ) : (
                                <>
                                    <MapPin className="h-5 w-5" />
                                    Add Location
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Info helper */}
                    <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                        <p className="text-sm text-blue-200/80 text-center">
                            💡 Enter a full address for accurate mapping
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}