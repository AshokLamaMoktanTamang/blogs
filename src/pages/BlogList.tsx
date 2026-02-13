import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { blogPosts } from "../data/blogData";

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-cv-bg selection:bg-cv-accent/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <div className="cv-section-title">Latest Articles</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-cv-text-primary mb-6 tracking-tight">
                Insights on engineering <br />
                <span className="text-cv-accent/80">
                  & digital experiences.
                </span>
              </h2>
              <p className="text-lg text-cv-text-secondary max-w-2xl leading-relaxed">
                A collection of thoughts, tutorials, and experiences in the
                world of modern web development and software design.
              </p>
            </div>

            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-secondary group-focus-within:text-cv-accent transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cv-bg-alt/50 border border-cv-border/50 rounded-xl py-3 pl-12 pr-4 text-sm text-cv-text-primary placeholder:text-cv-text-secondary focus:outline-none focus:border-cv-accent/50 focus:bg-cv-bg-alt transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className="cv-card group">
                <Link
                  to={`/blog/${post.id}`}
                  className="flex flex-col md:flex-row h-full"
                >
                  <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-cv-text-secondary uppercase tracking-[0.2em] mb-4">
                      <span className="text-cv-accent px-2 py-0.5 bg-cv-accent/10 rounded-full">
                        Engineering
                      </span>
                      <span className="w-1 h-1 rounded-full bg-cv-border" />
                      <span>{post.readTime} min read</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-cv-text-primary mb-4 group-hover:text-cv-accent transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-cv-text-secondary leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-cv-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-cv-accent/10 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-cv-accent" />
                        </div>
                        <div>
                          <p className="text-[10px] text-cv-text-secondary uppercase tracking-wider leading-none mb-1">
                            Published on
                          </p>
                          <p className="text-xs font-bold text-cv-text-primary leading-none">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-cv-accent uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-cv-bg-alt/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-cv-border/50">
                <Search className="w-8 h-8 text-cv-text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-cv-text-primary mb-2">
                No articles found
              </h3>
              <p className="text-cv-text-secondary">
                Try searching for different keywords or clear your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
