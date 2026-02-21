import type { BlogPost } from "@/types/blog";

interface RecentBlogsProps {
  posts: BlogPost[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const RecentBlogs = ({ posts }: RecentBlogsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="recent-blogs-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="recent-blogs-heading" className="text-4xl md:text-5xl font-black mb-4">
            Recent Blogs
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Fresh writing from Medium and LinkedIn hosted on this site.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="brutal-border bg-card p-6 brutal-shadow h-full">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase">
                <span className="brutal-border bg-primary px-2 py-1">{post.source}</span>
                <span>{dateFormatter.format(new Date(post.publishedAt))}</span>
              </div>

              <h3 className="text-xl font-black leading-tight">
                <a href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </a>
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>

              <div className="mt-5 flex items-center gap-4 text-sm font-bold">
                <a href={`/blog/${post.slug}`} className="hover:underline" aria-label={`Read full article ${post.title}`}>
                  Read Full Article
                </a>
                {post.sourceUrl && (
                  <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" aria-label={`Read original ${post.title} on ${post.source}`}>
                    Original Source
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/blog" className="inline-flex brutal-border bg-primary text-primary-foreground px-6 py-3 brutal-shadow-sm hover-lift font-bold">
            View All Blogs
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
