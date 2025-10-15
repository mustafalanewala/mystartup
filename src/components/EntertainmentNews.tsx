"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { formatDate } from "@/lib/news-utils";

export default function EntertainmentNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetcher();
        const allNews = Array.isArray(data) ? data : data.news || [];
        // Get latest news from Entertainment category
        const entertainmentNews = allNews
          .filter((item: NewsItem) => item.categrory_Name === "Entertainment")
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.insert_Date).getTime() -
              new Date(a.insert_Date).getTime()
          )
          .slice(0, 8); // Get top 8 items
        setNews(entertainmentNews);
      } catch (error) {
        console.error("Error loading entertainment news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex"
          >
            <div className="w-32 h-24 bg-gray-200 flex-shrink-0"></div>
            <div className="p-4 flex-1">
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

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No entertainment news available</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Entertainment</h2>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <article
            key={item.news_Id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex">
              <div className="w-32 h-24 relative flex-shrink-0">
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
                  <span className="bg-accent-purple px-2 py-1 rounded text-xs font-medium text-white">
                    {item.categrory_Name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {formatDate(item.insert_Date)}
                  </span>
                </div>

                <Link href={`/news/${item.slug}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-accent-purple transition-colors duration-200 line-clamp-2">
                    {item.news_Title}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.news_Content}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {item.news_Source || "Unknown Source"}
                  </span>
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-accent-purple hover:text-accent-blue font-medium text-sm transition-colors duration-200"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
