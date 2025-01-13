import { Nav } from "@/components/home/Nav";
import HeroSection from "@/components/home/Hero";
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
