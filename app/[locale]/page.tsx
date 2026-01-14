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
    <div className="min-h-screen bg-[#FDFDFD] relative overflow-hidden text-neutral-900">
      {/* Fond épuré - Trame de fond très subtile */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="px-6 py-12 lg:px-24 max-h-min">
          <div className="max-w-5xl mx-auto text-center space-y-12 py-12">
            <div className="inline-flex items-center gap-3 bg-transparent px-2 py-1 border-b border-neutral-200 mb-4">
              <span className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                {content.badgeText || "The new way to plan adventures"}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.05] tracking-tight text-neutral-950">
              {content.title}
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed font-light italic">
              {content.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-10">
              <Link href={user ? "/trips" : "/auth/signin"}>
                <Button className="h-14 bg-neutral-950 hover:bg-neutral-800 text-white px-10 rounded-none transition-all duration-500 uppercase text-xs tracking-widest">
                  {content.getStarted}
                </Button>
              </Link>
              <Link href={user ? "/globe" : "/auth/signin"}>
                <Button variant="outline" className="h-14 bg-transparent border-neutral-200 hover:border-neutral-950 text-neutral-950 px-10 rounded-none transition-all duration-500 uppercase text-xs tracking-widest">
                  {content.exploreGlobe}
                </Button>
              </Link>
            </div>

            {/* Preview Image - Aspect "Cadre d'Art" */}
            <div className="relative mx-auto max-w-6xl mt-24 border border-neutral-100 bg-white p-4 shadow-2xl shadow-neutral-200/50">
              <div className="aspect-[16/8] overflow-hidden bg-neutral-50 flex items-center justify-center">
                <div className="text-center group cursor-pointer">
                  <MapIcon className="h-12 w-12 mx-auto mb-4 text-neutral-200 group-hover:text-neutral-400 transition-colors duration-700" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-300">View Gallery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES - Épurement des icônes et des cartes */}
        <section className="container mx-auto px-6 py-32 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-950 mb-8">
                {content.featuresTitle}
              </h2>
              <div className="w-12 h-[1px] bg-neutral-950 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                { icon: MapPin, title: content.feature1.title, desc: content.feature1.description },
                { icon: Globe, title: content.feature2.title, desc: content.feature2.description },
                { icon: Calendar, title: content.feature3.title, desc: content.feature3.description }
              ].map((feature, i) => (
                <div key={i} className="space-y-6 text-center">
                  <feature.icon className="h-6 w-6 mx-auto text-neutral-950 stroke-[1px]" />
                  <h3 className="text-lg font-medium tracking-tight text-neutral-950 uppercase text-[13px]">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-light text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Inversion du design pour un impact fort */}
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto bg-neutral-950 py-24 px-12 text-center relative overflow-hidden">
            {/* Grain texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-6xl font-serif font-light text-white tracking-tight">
                {content.ctaTitle || "Ready to map your world?"}
              </h2>
              
              <p className="text-neutral-400 max-w-xl mx-auto font-light leading-relaxed italic">
                {content.ctaSubtitle || "Join thousands of travelers creating their personal travel atlas. No booking, just pure adventure planning."}
              </p>

              <div className="flex justify-center pt-6">
                <Link href={user ? "/trips/new" : "/auth/signin"}>
                  <Button size="lg" className="bg-white hover:bg-neutral-200 text-neutral-950 px-12 py-8 rounded-none transition-all duration-500 uppercase text-xs tracking-[0.2em] font-bold">
                    {content.createFirstTrip}
                    <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}