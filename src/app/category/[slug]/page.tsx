"use client";

import { use, useState } from "react";
import useSWR from "swr";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Pagination } from "@/components/ui/pagination";
import { fetcher } from "@/lib/fetcher";
import type { NewsItem } from "@/lib/types";
import {
  formatDate,
  getCategoryFromSlug,
  filterByCategory,
  paginateItems,
} from "@/lib/news-utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Ads from "@/components/Ads";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, error, isLoading } = useSWR<NewsItem[]>("/api/news", fetcher);

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
  const paginatedNews = paginateItems(categoryNews, currentPage, itemsPerPage);

  if (categoryNews.length === 0) {
    // Don't call notFound(), handle gracefully instead
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {categoryName}
            </h1>
            <div className="text-gray-500 text-lg">
              No news available in this category at the moment.
            </div>
            <div className="mt-6">
              <Link
                href="/"
                className="text-accent-blue hover:text-accent-purple font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
              <span>{categoryNews.length} articles total</span>
              <span>•</span>
              <span>
                Showing {paginatedNews.items.length} articles on page{" "}
                {currentPage}
              </span>
              <span>•</span>
              <span>Updated regularly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Ad */}
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Ads className="w-full max-w-4xl" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Articles Grid */}
        {paginatedNews.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews.items.map((article) => (
              <div
                key={article.news_Id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.news_Title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>

                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-gray-500 text-xs font-medium">
                      {formatDate(article.insert_Date)}
                    </span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <h4 className="text-base font-bold text-gray-900 mb-2 hover:text-accent-blue transition-colors duration-200 line-clamp-2 group-hover:text-accent-blue leading-tight">
                      {article.news_Title}
                    </h4>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {article.news_Content}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs font-medium">
                      {article.news_Source}
                    </span>
                    <Link
                      href={`/news/${article.slug}`}
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

        {/* Pagination */}
        {paginatedNews.totalPages > 1 && (
          <div className="mt-12 mb-8">
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedNews.totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                // Scroll to top of articles section
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="justify-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}
