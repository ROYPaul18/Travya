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
import Map from "@/components/ui/Map";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const content = useIntlayer("home", locale);
  const user = await getUser();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-sm border border-gray-200 mb-4">
              <Globe className="h-4 w-4 text-gray-600" />
              <span className="text-gray-700 text-sm font-light">
                {content.badgeText}
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {content.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-10">
              <Link href={user ? "/trips" : "/auth/signin"}>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-6 text-base rounded-sm transition-all duration-200 flex items-center gap-2 group">
                  {content.getStarted}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href={user ? "/globe" : "/auth/signin"}>
                <Button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-6 text-base rounded-sm transition-all duration-200 flex items-center gap-2 font-medium">
                  <Globe className="h-5 w-5" />
                  {content.exploreGlobe}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-16 lg:mb-20 text-gray-900">
              {content.featuresTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {/* Feature 1 */}
              <div className="bg-white p-8 lg:p-10 border border-gray-300 rounded-sm hover:border-gray-400 transition-all duration-200 group">
                <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                  <MapPin className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  {content.feature1.title}
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  {content.feature1.description}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 lg:p-10 border border-gray-300 rounded-sm hover:border-gray-400 transition-all duration-200 group">
                <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                  <Globe className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  {content.feature2.title}
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  {content.feature2.description}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 lg:p-10 border border-gray-300 rounded-sm hover:border-gray-400 transition-all duration-200 group">
                <div className="bg-gray-100 w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                  <Calendar className="h-7 w-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  {content.feature3.title}
                </h3>
                <p className="text-base text-gray-600 font-light leading-relaxed">
                  {content.feature3.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-16 lg:mb-20 text-gray-900">
              {content.howItWorksTitle}
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6 bg-white p-6 lg:p-8 border border-gray-300 rounded-sm">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-sm flex items-center justify-center font-medium text-base flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {content.step1.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {content.step1.description}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 bg-white p-6 lg:p-8 border border-gray-300 rounded-sm">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-sm flex items-center justify-center font-medium text-base flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {content.step2.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {content.step2.description}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 bg-white p-6 lg:p-8 border border-gray-300 rounded-sm">
                <div className="bg-gray-900 text-white w-10 h-10 rounded-sm flex items-center justify-center font-medium text-base flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {content.step3.title}
                  </h3>
                  <p className="text-base text-gray-600 font-light leading-relaxed">
                    {content.step3.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Final CTA Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto bg-neutral-900 p-12 lg:p-16 border border-gray-800 rounded-sm text-center">
            <Plane className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              {content.ctaTitle || "Your journey awaits"}
            </h2> 
            <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              {content.ctaSubtitle || "Start your first adventure today and collect stories that will last a lifetime."}
            </p>
            <Link href={user ? "/trips/new" : "/auth/signin"}>
              <Button className="bg-white hover:bg-gray-100 text-neutral-900 font-medium px-8 py-6 text-base rounded-sm transition-all duration-200 flex items-center gap-2 mx-auto group">
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