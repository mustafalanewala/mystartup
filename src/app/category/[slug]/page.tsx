"use client";

import { use } from "react";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { fetcher } from "@/lib/fetcher";
import type { NewsItem } from "@/lib/types";
import {
  formatDate,
  getCategoryFromSlug,
  filterByCategory,
} from "@/lib/news-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, error, isLoading } = useSWR<NewsItem[]>(
    "/data/data.json",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading News
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryFromSlug(data, slug);
  const categoryNews = filterByCategory(data, slug);

  if (categoryNews.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm py-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-accent-blue transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>

          {/* Category Header */}
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {categoryName}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Stay updated with the latest {categoryName.toLowerCase()} news
                  and insights.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-6 text-sm text-gray-500">
              <span>{categoryNews.length} articles</span>
              <span>•</span>
              <span>Updated regularly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Articles Grid */}
        {categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryNews.map((article) => (
              <div
                key={article.News_Id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.Image}
                    alt={article.News_Title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-gray-500 text-xs font-medium">
                      {formatDate(article.Insert_Date)}
                    </span>
                  </div>

                  <Link href={`/news/${article.Slug}`}>
                    <h4 className="text-base font-bold text-gray-900 mb-2 hover:text-accent-blue transition-colors duration-200 line-clamp-2 group-hover:text-accent-blue leading-tight">
                      {article.News_Title}
                    </h4>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {article.News_Content}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs font-medium">
                      {article.News_Source}
                    </span>
                    <Link
                      href={`/news/${article.Slug}`}
                      className="text-accent-blue hover:text-accent-purple text-xs font-semibold transition-colors duration-200 flex items-center"
                    >
                      Read
                      <svg
                        className="ml-1 w-3 h-3"
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No articles found in this category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
