"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import { getCategories, slugifyCategory } from "@/lib/news-utils";
import type { NewsItem } from "@/lib/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data } = useSWR("/data/data.json", fetcher);
  const categories = getCategories(
    Array.isArray(data) ? data : data?.news || []
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="News Logo"
              width={250}
              height={60}
              className="h-auto"
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Categories section */}
        <div className="border-t border-gray-200">
          <div
            className={cn(
              "flex space-x-8 overflow-x-auto py-3 md:flex",
              isMobileMenuOpen
                ? "flex flex-col space-x-0 space-y-2 pb-4"
                : "hidden md:flex"
            )}
          >
            {categories.map((category, index) => (
              <Link
                key={category}
                href={`/category/${slugifyCategory(category)}`}
                className={cn(
                  "font-medium text-sm whitespace-nowrap transition-colors duration-200",
                  index % 2 === 0
                    ? "text-gray-700 hover:text-accent-blue"
                    : "text-gray-700 hover:text-accent-purple"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
