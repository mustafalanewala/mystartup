"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { formatDate, slugifyCategory } from "@/lib/news-utils";

export default function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetcher("/data/data.json");
        const allNews = Array.isArray(data) ? data : data.news || [];
        // Get the latest 5 news items for carousel
        const latestNews = allNews
          .filter((item: NewsItem) => item.Active_Flag)
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.Insert_Date).getTime() -
              new Date(a.Insert_Date).getTime()
          )
          .slice(0, 5);
        setNews(latestNews);
      } catch (error) {
        console.error("Error loading carousel news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [news.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  if (loading) {
    return (
      <div className="relative h-96 md:h-[500px] bg-gray-200 animate-pulse rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-gray-500">No news available</div>
      </div>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-96 md:h-[500px]">
      {/* Carousel Section - 70% width */}
      <div className="lg:col-span-7 h-full">
        <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
          {/* Main carousel image */}
          <div className="relative h-full">
            <Image
              src={currentNews.Image}
              alt={currentNews.News_Title}
              fill
              className="object-cover"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                      currentNews.Categrory_Name === "Business" ||
                      currentNews.Categrory_Name === "Technology" ||
                      currentNews.Categrory_Name === "Sports"
                        ? "bg-accent-blue"
                        : "bg-accent-purple"
                    }`}
                  >
                    {currentNews.Categrory_Name}
                  </span>
                  <span className="text-gray-300 text-sm">
                    {formatDate(currentNews.Insert_Date)}
                  </span>
                </div>

                <Link href={`/news/${currentNews.Slug}`}>
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                    {currentNews.News_Title}
                  </h2>
                </Link>

                <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-2xl">
                  {currentNews.News_Content}
                </p>

                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">
                    By {currentNews.News_Source}
                  </span>
                  <Link
                    href={`/news/${currentNews.Slug}`}
                    className="text-accent-blue hover:text-accent-purple font-medium text-sm transition-colors duration-200"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* News List Section - 30% width */}
      <div className="lg:col-span-3 h-full">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Latest Headlines
          </h3>
          <div className="space-y-4">
            {news.slice(0, 8).map((article, index) => (
              <div
                key={article.News_Id}
                className={`pb-4 ${
                  index < 7 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white bg-accent-blue">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/news/${article.Slug}`}>
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-accent-blue transition-colors duration-200 line-clamp-2 leading-tight mb-1">
                        {article.News_Title}
                      </h4>
                    </Link>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{formatDate(article.Insert_Date)}</span>
                      <span>•</span>
                      <span>{article.News_Source}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
