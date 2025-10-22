import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Globe, Plane, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
      
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-4 animate-pulse">
              <Globe className="h-5 w-5 text-blue-300" />
              <span className="text-blue-100 text-sm font-medium">Plan Your Next Adventure</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Your Journey Starts Here
            </h1>

            <p className="text-xl md:text-2xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
              Plan, organize, and visualize your travels all in one place. From dream destinations to detailed itineraries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
              <Link href="/trips">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 group">
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/globe">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-6 text-lg rounded-lg transition-all duration-300 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Explore Globe
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Everything You Need to Plan Your Trip
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Itineraries</h3>
                <p className="text-blue-200/80">
                  Create detailed itineraries with multiple locations. Organize your stops and visualize your route.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Interactive Globe</h3>
                <p className="text-blue-200/80">
                  See all your visited destinations on a beautiful 3D globe. Track your travel journey visually.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Trip Management</h3>
                <p className="text-blue-200/80">
                  Manage all your trips in one dashboard. Track dates, locations, and create memories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Start Planning in 3 Simple Steps
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-blue-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Create Your Trip</h3>
                  <p className="text-blue-200/80">
                    Set your destination, dates, and trip details. Add a description to remember what makes this journey special.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-cyan-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Add Locations</h3>
                  <p className="text-blue-200/80">
                    Pin all the places you want to visit. Build your perfect itinerary with multiple stops along the way.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-purple-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Visualize & Explore</h3>
                  <p className="text-blue-200/80">
                    View your trip on interactive maps and track all your adventures on the 3D globe. Share your journey!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md p-12 rounded-2xl border border-white/20 text-center">
            <Plane className="h-16 w-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
              Join travelers worldwide who trust Travel Planner to organize their dream vacations.
            </p>
            <Link href="/trips/new">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 mx-auto group">
                Create Your First Trip
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>       
      </div>
    </div>
  );
}