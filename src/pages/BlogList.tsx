import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "../data/blogData";

export default function BlogList() {
  return (
    <div className="min-h-screen bg-cv-bg selection:bg-cv-accent/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16">
          <div className="cv-section-title">Latest Articles</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-cv-text-primary mb-6 tracking-tight">
            Insights on engineering <br />
            <span className="text-cv-accent/80">& digital experiences.</span>
          </h2>
          <p className="text-lg text-cv-text-secondary max-w-2xl leading-relaxed">
            A collection of thoughts, tutorials, and experiences in the world of
            modern web development and software design.
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="cv-card group overflow-hidden">
              <Link to={`/blog/${post.id}`} className="block">
                <div className="aspect-[21/9] overflow-hidden border-b border-cv-border/50">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-6 text-xs font-semibold text-cv-text-secondary uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cv-accent/60" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cv-accent/60" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-cv-text-primary mb-4 group-hover:text-cv-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-cv-text-secondary leading-relaxed mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-cv-border group-hover:border-cv-accent/50 group-hover:bg-cv-accent/5 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-cv-text-secondary group-hover:text-cv-accent transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-cv-accent text-sm font-bold uppercase tracking-wider md:hidden">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
