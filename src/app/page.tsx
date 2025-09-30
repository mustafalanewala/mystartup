import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsCarousel from "@/components/NewsCarousel";
import LatestNews from "@/components/LatestNews";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsCarousel />
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LatestNews />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
