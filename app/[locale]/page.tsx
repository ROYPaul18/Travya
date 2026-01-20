import { Link } from "@/components/Link";
import {
  MapPin,
  Calendar,
  Globe,
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
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900">
      
      {/* --- HERO SECTION SOBRE (100vh) --- */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-6">
        
        {/* Image de fond : Très discrète, désaturée */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&q=80&w=2070" 
            alt="Minimal landscape"
            className="w-full h-full object-cover opacity-20 grayscale-[0.5] contrast-[1]"
          />
          {/* Dégradé subtil pour fondre l'image dans le blanc du site */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FDFDFD]/50 via-transparent to-[#FDFDFD]"></div>
        </div>

        {/* Contenu : Épuré au maximum */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-block">
            <span className="text-neutral-400 text-[10px] uppercase tracking-[0.4em] font-medium">
              {content.badgeText || "The new way to plan adventures"}
            </span>
            <div className="w-8 h-[1px] bg-neutral-200 mx-auto mt-4"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-logo font-light leading-tight tracking-tight text-neutral-950">
            {content.title}
          </h1>
          
          <p className="text-base md:text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed font-light italic">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center pt-6">
            <Link href={user ? "/trips" : "/auth/signin"}>
              <button className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-950 border-b border-neutral-950 pb-2 hover:opacity-50 transition-all duration-300">
                {content.getStarted}
              </button>
            </Link>
            <Link href={user ? "/globe" : "/auth/signin"}>
              <button className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-neutral-950 transition-all duration-300">
                {content.exploreGlobe}
              </button>
            </Link>
          </div>
        </div>

        {/* Indicateur de scroll minimaliste */}
        <div className="absolute bottom-12 flex flex-col items-center">
          <div className="w-[1px] h-12 bg-neutral-200"></div>
        </div>
      </section>

      {/* --- SECTION FEATURES : Très aérée --- */}
      <section className="bg-white py-32 border-t border-neutral-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-24">
            {[
              { icon: MapPin, title: content.feature1.title, desc: content.feature1.description },
              { icon: Globe, title: content.feature2.title, desc: content.feature2.description },
              { icon: Calendar, title: content.feature3.title, desc: content.feature3.description }
            ].map((feature, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-[11px] font-bold tracking-[0.2em] text-neutral-950 uppercase">
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

      {/* --- CTA DISCRET --- */}
      <section className="py-40 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-950">
            {content.ctaTitle || "Ready to map your world?"}
          </h2>
          <Link href={user ? "/trips/new" : "/auth/signin"} className="inline-block group">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold">
              <span>{content.createFirstTrip}</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            <div className="h-[1px] bg-neutral-950 w-full mt-1"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}