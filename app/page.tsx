import { Nav } from "@/components/home/nav";
import HeroSection from "@/components/home/hero";
import FeatureSection from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <HeroSection />
      <FeatureSection />
    </main>
  );
}
