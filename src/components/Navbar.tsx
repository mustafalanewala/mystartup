"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { fetcher } from "@/lib/fetcher";
import { getCategories, slugifyCategory } from "@/lib/news-utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data, isLoading } = useSWR("/api/news", fetcher);
  const categories = getCategories(data || []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, categories, and menu */}
        <div className="flex justify-between md:grid md:grid-cols-3 items-center py-4">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="News Logo"
                width={250}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          <div className="justify-self-center hidden md:flex space-x-8">
            {categories.map((category, index) => (
              <Link
                key={category}
                href={`/category/${slugifyCategory(category)}`}
                className={cn(
                  "font-medium text-sm whitespace-nowrap transition-colors duration-200",
                  "text-white hover:text-accent-purple"
                )}
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="justify-self-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent-purple"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 py-4 border-t border-gray-600">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${slugifyCategory(category)}`}
                className="font-medium text-sm text-white hover:text-accent-purple transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
