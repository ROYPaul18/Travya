
import { Link } from "@/components/Link";
import {
  MapPin,
  Calendar,
  Globe,
  Plane,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntlayer } from "next-intlayer/server";
import { getUser } from "@/lib/auth-server";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const content = useIntlayer("home", locale);
  const user = await getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-4 animate-pulse">
              <Globe className="h-5 w-5 text-blue-300" />
              <span className="text-blue-100 text-sm font-medium">
                {content.badgeText}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              {content.title}
            </h1>

            <p className="text-xl md:text-2xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
              <Link href="/trips">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 group">
                  {content.getStarted}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/globe">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-6 text-lg rounded-lg transition-all duration-300 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {content.exploreGlobe}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              {content.featuresTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.feature1.title}
                </h3>
                <p className="text-blue-200/80">
                  {content.feature1.description}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.feature2.title}
                </h3>
                <p className="text-blue-200/80">
                  {content.feature2.description}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {content.feature3.title}
                </h3>
                <p className="text-blue-200/80">
                  {content.feature3.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              {content.howItWorksTitle}
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-blue-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {content.step1.title}
                  </h3>
                  <p className="text-blue-200/80">
                    {content.step1.description}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-cyan-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {content.step2.title}
                  </h3>
                  <p className="text-blue-200/80">
                    {content.step2.description}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="bg-purple-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {content.step3.title}
                  </h3>
                  <p className="text-blue-200/80">
                    {content.step3.description}
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
              {content.ctaTitle}
            </h2>
            <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">
              {content.ctaSubtitle}
            </p>
            <Link href="/trips/new">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-10 py-6 text-lg rounded-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2 mx-auto group">
                {content.createFirstTrip}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}