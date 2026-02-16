import { banners } from "@/data/banners";
import { BannerCard } from "./banner-card";

export function BannerGrid() {
    return (
        <section id="services" className="relative w-full px-6 py-24">
            <div className="mx-auto max-w-6xl">
                {/* 섹션 타이틀 */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        서비스 포털
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        NEXINOUS가 제공하는 서비스들을 탐색하세요.
                        <br />각 서비스를 클릭하면 해당 페이지로 바로 이동합니다.
                    </p>
                </div>

                {/* 배너 그리드 */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {banners.map((banner) => (
                        <BannerCard key={banner.id} banner={banner} />
                    ))}
                </div>
            </div>
        </section>
    );
}
