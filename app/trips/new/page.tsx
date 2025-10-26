"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createTrip } from "@/lib/actions/createTripAction"
import { UploadButton } from "@/lib/uploadthings"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useTransition } from "react"
import { Plane, Calendar, FileText, Image as ImageIcon, Loader2 } from "lucide-react"

export default function NewTrip() {
    const [isPending, startTransition] = useTransition()
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    return (   
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8 space-y-4">
                    <div className="inline-flex items-center justify-center bg-blue-500/20 p-4 rounded-full mb-2">
                        <Plane className="h-10 w-10 text-blue-300" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                        Create New Trip
                    </h1>
                    <p className="text-blue-200/80">Plan your next adventure</p>
                </div>

                <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-white text-2xl flex items-center gap-2">
                            <Plane className="h-6 w-6 text-blue-300" />
                            Trip Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form 
                            className="space-y-6" 
                            action={(formData: FormData) => {
                                if(imageUrl) {
                                    formData.append("imageUrl", imageUrl)
                                }
                                
                                startTransition(() => {
                                    createTrip(formData)
                                })
                            }}
                        >
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                    <Plane className="h-4 w-4 text-blue-300" />
                                    Title
                                </label>
                                <input 
                                    type="text" 
                                    name="title"
                                    className={cn(
                                        "w-full bg-white/5 border border-white/20 text-white",
                                        "placeholder-blue-200/50 px-4 py-3 rounded-lg",
                                        "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                                        "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
                                    )}
                                    placeholder="Voyage au Japon..."
                                    required
                                />
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-300" />
                                    Description
                                </label>
                                <textarea 
                                    name="description"
                                    rows={4}
                                    className={cn(
                                        "w-full bg-white/5 border border-white/20 text-white",
                                        "placeholder-blue-200/50 px-4 py-3 rounded-lg",
                                        "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                                        "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300",
                                        "resize-none"
                                    )}
                                    placeholder="Description du voyage...."
                                    required
                                />
                            </div>

                            {/* Date Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-300" />
                                        Start Date
                                    </label>
                                    <input 
                                        type="date" 
                                        name="startDate"
                                        className={cn(
                                            "w-full bg-white/5 border border-white/20 text-white",
                                            "px-4 py-3 rounded-lg",
                                            "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                                            "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
                                        )}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-300" />
                                        End Date
                                    </label>
                                    <input 
                                        type="date" 
                                        name="endDate"
                                        className={cn(
                                            "w-full bg-white/5 border border-white/20 text-white",
                                            "px-4 py-3 rounded-lg",
                                            "focus:outline-none focus:ring-2 focus:ring-blue-400/50",
                                            "focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
                                        )}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-blue-100 mb-2 flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4 text-blue-300" />
                                    Trip Image
                                </label>
                                
                                {imageUrl && (
                                    <div className="relative rounded-lg overflow-hidden border border-white/20 shadow-lg">
                                        <Image
                                            src={imageUrl}
                                            alt="Photo du voyage"
                                            className="w-full max-h-64 object-cover"
                                            width={600}
                                            height={256}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                    </div>
                                )}
                                
                                <div className="bg-white/5 border border-white/20 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300">
                                    <UploadButton
                                        endpoint={"imageUploader"}
                                        onClientUploadComplete={(res) => {
                                            if (res && res[0].url) {
                                                setImageUrl(res[0].url);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            console.error("Upload error", error)
                                        }}
                                        appearance={{
                                            button: "bg-blue-500/30 text-blue-100 hover:bg-blue-500/40 border border-blue-400/30",
                                            allowedContent: "text-blue-200/60"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Creating Trip...
                                    </>
                                ) : (
                                    <>
                                        <Plane className="h-5 w-5" />
                                        Save Trip
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Info helper */}
                        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
                            <p className="text-sm text-blue-200/80 text-center">
                                💡 Add an image to make your trip more memorable
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}