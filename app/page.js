 // app/page.js
import LatestPublicationsSlider from "@/components/LatestPublicationsSlider";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main>
      <LatestPublicationsSlider />
      <HeroSection />
    </main>
  );
}