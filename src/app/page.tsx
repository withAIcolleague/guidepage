import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BannerGrid } from "@/components/banner-grid";
import { QuickLinksSection } from "@/components/quick-links-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <BannerGrid />
        <QuickLinksSection />
      </main>
      <Footer />
    </>
  );
}
