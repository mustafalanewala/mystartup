import Image from "next/image";

const API_URL =
  "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=4&language=English";

type Blog = {
  blog_id?: number;
  blog_Title?: string;
  blog_Summary?: string;
  blog_Content?: string;
  image?: string;
  slug?: string;
};

function safeKey(value?: string | number) {
  return String(value ?? Math.random().toString(36).slice(2, 9));
}

export default async function BlogsPage() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const json = await res.json();
    const blogs = (json?.data?.blogs ?? []) as Blog[];

    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blogs</h1>
            <p className="text-lg text-gray-600">
              Read our latest articles and insights
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <article
                  key={safeKey(b.blog_id ?? b.slug)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {b.image && (
                    <div className="w-full h-48 relative overflow-hidden">
                      <Image
                        src={b.image}
                        alt={b.blog_Title ?? "blog"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {b.blog_Title}
                    </h2>

                    <div className="text-gray-700 text-sm mb-4 line-clamp-3">
                      <div dangerouslySetInnerHTML={{ __html: b.blog_Summary ?? b.blog_Content ?? '' }} />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Read more</span>
                      <a
                        href={`/blogs/${b.slug}`}
                        className="text-accent-purple hover:text-accent-blue font-medium text-sm transition-colors"
                      >
                        View Article →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blogs fetch error", error);
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Blogs</h1>
        <p>Failed to load blogs.</p>
      </main>
    );
  }
}
