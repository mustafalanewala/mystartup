import NewsCarousel from "@/components/NewsCarousel";
import LatestNews from "@/components/LatestNews";
import TechNews from "@/components/TechNews";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section with Carousel */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsCarousel />
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LatestNews />
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechNews />
        </div>
      </section>
    </div>
  );
}
