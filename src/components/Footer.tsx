"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { getCategories, slugifyCategory } from "@/lib/news-utils";
import type { NewsItem } from "@/lib/types";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data } = useSWR("/data/data.json", fetcher);
  const categories = getCategories(
    Array.isArray(data) ? data : data?.news || []
  ).slice(0, 4); // Show only first 4 categories in footer

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">MyStartup News</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for the latest news across business,
              technology, sports, and world events.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                Facebook
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={category}>
                  <Link
                    href={`/category/${slugifyCategory(category)}`}
                    className={`text-gray-300 hover:text-white transition-colors duration-200 ${
                      index % 2 === 0
                        ? "hover:text-accent-blue"
                        : "hover:text-accent-purple"
                    }`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-accent-blue transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-accent-purple transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-accent-blue transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-accent-purple transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} MyStartup News. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm mt-2 md:mt-0">
            Made with ❤️ for news enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
}
