"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { formatDate } from "@/lib/news-utils";

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsToShow = 6; // Show only 6 items on homepage

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetcher();
        // Get latest news excluding the ones in carousel (skip first 5)
        const latestNews = data
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.insert_Date).getTime() -
              new Date(a.insert_Date).getTime()
          )
          .slice(5, 5 + itemsToShow); // Get limited items for homepage
        setNews(latestNews);
      } catch (error) {
        console.error("Error loading latest news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const featuredNews = news.slice(0, 1); // First item as featured
  const sideNews = news.slice(1, 4); // Next 3 as side stories
  const gridNews = news.slice(1); // Rest in grid

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No latest news available</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="text-left">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest News</h2>
      </div>
      {/* Hero Featured Article */}
      {featuredNews.length > 0 && (
        <div className="relative bg-gradient-to-br from-gray-600 to-gray-50/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src={featuredNews[0].image}
              alt={featuredNews[0].news_Title}
              fill
              className="object-cover opacity-30"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>

          <div className="relative p-6 md:p-8 lg:p-12 min-h-[400px] flex flex-col justify-end">
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  BREAKING
                </span>
                <span className="bg-accent-blue px-4 py-2 rounded-full text-sm font-semibold text-white">
                  {featuredNews[0].categrory_Name}
                </span>
                <span className="text-gray-300 text-sm">
                  {formatDate(featuredNews[0].insert_Date)}
                </span>
              </div>

              <Link href={`/news/${featuredNews[0].slug}`}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 hover:text-blue-300 transition-colors duration-300 leading-tight">
                  {featuredNews[0].news_Title}
                </h1>
              </Link>

              <p className="text-gray-200 text-base lg:text-lg leading-relaxed mb-6 max-w-3xl line-clamp-3">
                {featuredNews[0].news_Content}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {featuredNews[0].news_Source?.charAt(0) || "N"}
                    </span>
                  </div>
                  <span className="text-gray-300 font-medium">
                    By {featuredNews[0].news_Source || "Unknown Source"}
                  </span>
                </div>

                <Link
                  href={`/news/${featuredNews[0].slug}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Read Full Story
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Magazine-style grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Large cards */}
        <div className="lg:col-span-2 space-y-6">
          {sideNews.map((item: NewsItem, index: number) => (
            <article
              key={item.news_Id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="md:flex">
                <div className="md:w-2/5 relative h-48 md:h-auto">
                  <Image
                    src={item.image}
                    alt={item.news_Title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-accent-blue px-2 py-1 rounded text-xs font-medium text-white">
                      {item.categrory_Name}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {formatDate(item.insert_Date)}
                    </span>
                  </div>

                  <Link href={`/news/${item.slug}`}>
                    <h4 className="font-bold text-xl text-gray-900 mb-3 hover:text-accent-blue transition-colors duration-200 line-clamp-2">
                      {item.news_Title}
                    </h4>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.news_Content}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {item.news_Source}
                    </span>
                    <Link
                      href={`/news/${item.slug}`}
                      className="text-accent-blue hover:text-accent-purple font-medium text-sm transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right column - Compact list */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            More Stories
          </h4>
          {gridNews.map((item: NewsItem) => (
            <article
              key={item.news_Id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.news_Title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-accent-blue px-2 py-1 rounded text-xs font-medium text-white">
                      {item.categrory_Name}
                    </span>
                  </div>

                  <Link href={`/news/${item.slug}`}>
                    <h5 className="font-semibold text-sm text-gray-900 mb-1 hover:text-accent-blue transition-colors duration-200 line-clamp-2">
                      {item.news_Title}
                    </h5>
                  </Link>

                  <p className="text-gray-600 text-xs line-clamp-1">
                    {item.news_Content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
