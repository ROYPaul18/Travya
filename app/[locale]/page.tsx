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
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 lg:py-24">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 mb-4 shadow-sm">
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 text-sm font-semibold">
                {content.badgeText}
              </span>
            </div>

            {/* Hero Title (font-extrabold conservé pour l'impact) */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-neutral-900 leading-tight tracking-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>

            {/* CTAs (font-bold remplacé par font-semibold) */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-10">
              <Link href={user ? "/trips" : "/auth/signin"}>
                <Button className="bg-neutral-900 hover:bg-gray-800 text-white font-medium px-10 py-6 text-xl rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-xl hover:shadow-2xl">
                  {content.getStarted}
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href={user ? "/globe" : "/auth/signin"}>
                <Button className="bg-white hover:bg-gray-50 text-neutral-900 border border-gray-300 px-10 py-6 text-xl rounded-xl transition-all duration-300 flex items-center gap-2 font-medium shadow-md">
                  <Globe className="h-6 w-6" />
                  {content.exploreGlobe}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Titre de section (font-bold conservé) */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 lg:mb-20 text-gray-900">
              {content.featuresTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {/* Feature 1 */}
              <div className="bg-white p-8 lg:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-[1.05]">
                  <MapPin className="h-8 w-8 text-gray-700" />
                </div>
                {/* Sous-titre (font-semibold remplacé par font-medium) */}
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  {content.feature1.title}
                </h3>
                {/* Description */}
                <p className="text-lg text-gray-700">
                  {content.feature1.description}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 lg:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-[1.05]">
                  <Globe className="h-8 w-8 text-gray-700" />
                </div>
                {/* Sous-titre (font-semibold remplacé par font-medium) */}
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  {content.feature2.title}
                </h3>
                {/* Description */}
                <p className="text-lg text-gray-700">
                  {content.feature2.description}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 lg:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-[1.05]">
                  <Calendar className="h-8 w-8 text-gray-700" />
                </div>
                {/* Sous-titre (font-semibold remplacé par font-medium) */}
                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  {content.feature3.title}
                </h3>
                {/* Description */}
                <p className="text-lg text-gray-700">
                  {content.feature3.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28 bg-gray-50/70">
          <div className="max-w-4xl mx-auto">
            {/* Titre de section (font-bold conservé) */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 lg:mb-20 text-gray-900">
              {content.howItWorksTitle}
            </h2>

            <div className="space-y-10">
              {/* Step 1 */}
              <div className="flex items-start gap-8 bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-md">
                {/* Numéro (font-bold remplacé par font-semibold) */}
                <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  {/* Titre d'étape (font-semibold remplacé par font-medium) */}
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {content.step1.title}
                  </h3>
                  {/* Description */}
                  <p className="text-lg text-gray-700">
                    {content.step1.description}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-8 bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-md">
                {/* Numéro (font-bold remplacé par font-semibold) */}
                <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  {/* Titre d'étape (font-semibold remplacé par font-medium) */}
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {content.step2.title}
                  </h3>
                  {/* Description */}
                  <p className="text-lg text-gray-700">
                    {content.step2.description}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-8 bg-white p-6 lg:p-8 rounded-xl border border-gray-200 shadow-md">
                {/* Numéro (font-bold remplacé par font-semibold) */}
                <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  {/* Titre d'étape (font-semibold remplacé par font-medium) */}
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {content.step3.title}
                  </h3>
                  {/* Description */}
                  <p className="text-lg text-gray-700">
                    {content.step3.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* Final CTA Section */}
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto bg-neutral-950 p-12 lg:p-16 rounded-2xl text-center shadow-2xl">
            <Plane className="h-16 w-16 text-white mx-auto mb-6" />
            {/* Titre de CTA (font-bold conservé) */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {content.ctaTitle || "Your journey awaits"}
            </h2> 
            {/* Sous-titre de CTA */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {content.ctaSubtitle || "Start your first adventure today and collect stories that will last a lifetime."}
            </p>
            <Link href={user ? "/trips/new" : "/auth/signin"}>
              <Button className="bg-white hover:bg-gray-100 text-neutral-900 font-medium px-10 py-6 text-xl rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto group shadow-2xl">
                {content.createFirstTrip}
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}