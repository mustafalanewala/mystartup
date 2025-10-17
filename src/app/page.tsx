import NewsCarousel from "@/components/NewsCarousel";
import LatestNews from "@/components/LatestNews";
import TechNews from "@/components/TechNews";
import EntertainmentNews from "@/components/EntertainmentNews";
import Ads from "@/components/Ads";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section with Carousel */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsCarousel />
        </div>
      </section>

      {/* Banner Ad */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Ads className="w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LatestNews />
        </div>
      </section>

      {/* Medium Ad */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Ads className="w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechNews />
        </div>
      </section>

      {/* Entertainment Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EntertainmentNews />
        </div>
      </section>
    </div>
  );
}
