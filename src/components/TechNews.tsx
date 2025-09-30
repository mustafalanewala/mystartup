"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { formatDate } from "@/lib/news-utils";

export default function TechNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetcher("/data/data.json");
        const allNews = Array.isArray(data) ? data : data.news || [];
        // Get latest news from Technology category
        const techNews = allNews
          .filter(
            (item: NewsItem) =>
              item.Active_Flag && item.Categrory_Name === "Technology"
          )
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.Insert_Date).getTime() -
              new Date(a.Insert_Date).getTime()
          )
          .slice(0, 6); // Get top 6 items
        setNews(techNews);
      } catch (error) {
        console.error("Error loading technology news:", error);
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

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No technology news available</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Technology</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article
            key={item.News_Id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48">
              <Image
                src={item.Image}
                alt={item.News_Title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-accent-blue px-2 py-1 rounded text-xs font-medium text-white">
                  {item.Categrory_Name}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDate(item.Insert_Date)}
                </span>
              </div>

              <Link href={`/news/${item.Slug}`}>
                <h3 className="font-bold text-xl text-gray-900 mb-3 hover:text-accent-blue transition-colors duration-200 line-clamp-2">
                  {item.News_Title}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.News_Content}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  {item.News_Source}
                </span>
                <Link
                  href={`/news/${item.Slug}`}
                  className="text-accent-blue hover:text-accent-purple font-medium text-sm transition-colors duration-200"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
