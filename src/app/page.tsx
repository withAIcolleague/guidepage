import { Header } from "@/components/header";

import { BannerGrid } from "@/components/banner-grid";
import { QuickLinksSection } from "@/components/quick-links-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <QuickLinksSection />
        <BannerGrid />
      </main>
      <Footer />
    </>
  );
}
