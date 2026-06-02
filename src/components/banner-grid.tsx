import { banners } from "@/data/banners";
import { BannerCard } from "./banner-card";

export function BannerGrid() {
  return (
    <section id="services" className="mb-3">
      <h2 className="sr-only">서비스 포털</h2>
      <div className="flex flex-wrap items-start justify-center gap-x-2.5 gap-y-2 sm:justify-start">
        {banners.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    </section>
  );
}
