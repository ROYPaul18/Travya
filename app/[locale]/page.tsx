import { Link } from "@/components/Link";
import {
  MapPin,
  Calendar,
  Globe,
  Compass, 
  ArrowRight,
  Map as MapIcon, 
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size:14px_24px"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gray-200 opacity-20 blur-[100px]"></div>

      <div className="relative z-10">
      
        <section className="px-4 py-24 lg:px-24">
          <div className="max-w-5xl mx-auto text-center space-y-8 py-12">
            
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm mb-6 transition-transform hover:scale-105 cursor-default">
              <Globe className="h-4 w-4 text-green-950" />
              <span className="text-gray-600 text-sm font-medium">
                {content.badgeText || "The new way to plan adventures"}
              </span>
            </div>

            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.1] tracking-tight">
              {content.title}
            </h1>

            
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              {content.subtitle}
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 pb-12">
              <Link href={user ? "/trips" : "/auth/signin"}>
                <Button className="h-auto bg-green-950 hover:bg-green-950 hover:shadow-md text-white px-8 py-3 text-lg rounded-sm transition-all shadow-md flex items-center gap-2 group">
                  {content.getStarted}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href={user ? "/globe" : "/auth/signin"}>
                <Button variant="outline" className="h-auto bg-white hover:bg-gray-50 text-gray-900 border-gray-200 px-6 py-3 text-lg rounded-sm transition-all flex items-center gap-2 shadow-sm">
                  {content.exploreGlobe}
                </Button>
              </Link>
            </div>

            
            <div className="relative mx-auto max-w-5xl mt-12 rounded-lg border border-gray-200 bg-gray-50/50 p-2 shadow-sm lg:mt-20">
               <div className="aspect-video overflow-hidden rounded-md bg-white flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <MapIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <span className="text-sm font-medium opacity-40">A venir...</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        
        <section className="container mx-auto px-4 py-24 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                {content.featuresTitle}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Focus on the experience, not the logistics. Build your itinerary, pin your favorite spots, and keep your memories alive.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
        
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <MapPin className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {content.feature1.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {content.feature1.description}
                </p>
              </div>

              
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                  <Globe className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {content.feature2.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {content.feature2.description}
                </p>
              </div>

              
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                  <Calendar className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {content.feature3.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {content.feature3.description}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto bg-green-950 rounded-2xl p-12 lg:p-20 text-center relative overflow-hidden">
        
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <Compass className="h-16 w-16 text-gray-200 mx-auto mb-8 animate-pulse" />
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-tight">
              {content.ctaTitle || "Ready to map your world?"}
            </h2> 
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              {content.ctaSubtitle || "Join thousands of travelers creating their personal travel atlas. No booking, just pure adventure planning."}
            </p>
            
            <div className="flex justify-center">
                <Link href={user ? "/trips/new" : "/auth/signin"}>
                <Button size="lg" className="bg-white hover:bg-gray-100 text-neutral-900 font-medium px-10 py-7 text-lg rounded-full transition-all duration-300 flex items-center gap-2">
                    {content.createFirstTrip}
                    <ArrowRight className="h-5 w-5" />
                </Button>
                </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}