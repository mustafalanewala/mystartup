import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL =
  "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=4&language=English";

type Blog = {
  blog_id?: number;
  blog_Title?: string;
  blog_Summary?: string;
  blog_Content?: string;
  image?: string;
  slug?: string;
  category?: string;
  tags?: string;
  language?: string;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const json = await res.json();
    const blogs = (json?.data?.blogs ?? []) as Blog[];

    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/blogs"
              className="inline-flex items-center text-accent-purple hover:text-accent-blue transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Blogs
            </Link>
          </div>

          {/* Blog Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.blog_Title}
            </h1>
            {blog.category && (
              <p className="text-lg text-accent-purple font-medium mb-2">
                {blog.category}
              </p>
            )}
            {blog.tags && (
              <p className="text-sm text-gray-600">Tags: {blog.tags}</p>
            )}
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="w-full h-64 md:h-96 relative rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={blog.image}
                alt={blog.blog_Title ?? "blog"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Blog Content */}
          <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {blog.blog_Summary && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Summary
                </h2>
                <div className="text-gray-700 text-lg leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.blog_Summary }}
                  />
                </div>
              </div>
            )}

            {blog.blog_Content && (
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.blog_Content }}
                />
              </div>
            )}
          </article>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-accent-purple text-white font-medium rounded-lg hover:bg-accent-blue transition-colors duration-200"
            >
              Explore More Blogs
            </Link>
          </footer>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blog detail fetch error", error);
    notFound();
  }
}
