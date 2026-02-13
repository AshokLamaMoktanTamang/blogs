import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { blogPosts } from "../data/blogData";

export default function BlogReader() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={key++}
            className="text-4xl font-bold text-cv-text-primary mb-8 mt-12 tracking-tight"
          >
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-2xl font-bold text-cv-text-primary mb-6 mt-10 tracking-tight"
          >
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-xl font-bold text-cv-text-primary mb-4 mt-8 tracking-tight"
          >
            {line.substring(4)}
          </h3>,
        );
      } else if (line.startsWith("![") && line.includes("](")) {
        const alt = line.match(/!\[(.*?)\]/)?.[1] || "";
        const src = line.match(/\((.*?)\)/)?.[1] || "";
        elements.push(
          <div key={key++} className="my-12">
            <img
              src={src}
              alt={alt}
              className="w-full rounded-2xl border border-cv-border/50 shadow-2xl"
            />
            {alt && (
              <p className="text-center text-xs text-cv-text-secondary mt-4 italic">
                {alt}
              </p>
            )}
          </div>,
        );
      } else if (line.startsWith("```") || line.startsWith("// filename:")) {
        let filename = "";
        let currentLine = line;

        if (currentLine.startsWith("// filename:")) {
          filename = currentLine.replace("// filename:", "").trim();
          i++;
          currentLine = lines[i];
        }

        if (currentLine.startsWith("```")) {
          const codeLines: string[] = [];
          i++;
          while (i < lines.length && !lines[i].startsWith("```")) {
            codeLines.push(lines[i]);
            i++;
          }

          elements.push(
            <div
              key={key++}
              className="my-8 rounded-xl border border-cv-border/50 overflow-hidden bg-[#0d1117]"
            >
              {filename && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-cv-border/30 bg-[#161b22]">
                  <span className="text-[10px] font-mono font-bold text-cv-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="ml-2">{filename}</span>
                  </span>
                </div>
              )}
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed scrollbar-thin scrollbar-thumb-cv-border/50 scrollbar-track-transparent">
                <code className="font-mono text-[#e6edf3]">
                  {codeLines.map((codeLine, idx) => {
                    const highlighted = codeLine
                      .replace(
                        /\b(const|let|var|function|export|default|import|from|return|if|else|for|while|class|interface|type|public|private)\b/g,
                        '<span class="text-[#ff7b72]">$1</span>',
                      )
                      .replace(
                        /\b(true|false|null|undefined)\b/g,
                        '<span class="text-[#79c0ff]">$1</span>',
                      )
                      .replace(
                        /("[^"]*"|'[^']*')/g,
                        '<span class="text-[#a5d6ff]">$1</span>',
                      )
                      .replace(
                        /\/\/.*/g,
                        '<span class="text-[#8b949e]">$&</span>',
                      )
                      .replace(
                        /\b([A-Z][a-zA-Z0-9]*)\b/g,
                        '<span class="text-[#ffa657]">$1</span>',
                      )
                      .replace(
                        /\b([0-9]+)\b/g,
                        '<span class="text-[#d2a8ff]">$1</span>',
                      );

                    return (
                      <div
                        key={idx}
                        dangerouslySetInnerHTML={{
                          __html: highlighted || "&nbsp;",
                        }}
                      />
                    );
                  })}
                </code>
              </pre>
            </div>,
          );
        }
      } else if (line.startsWith("- ")) {
        const listItems: string[] = [line.substring(2)];
        i++;
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(lines[i].substring(2));
          i++;
        }
        i--;
        elements.push(
          <ul
            key={key++}
            className="space-y-4 mb-8 text-cv-text-secondary list-none pl-1"
          >
            {listItems.map((item, idx) => {
              let content: React.ReactNode = item;
              if (item.startsWith("**") && item.includes("**:")) {
                const parts = item.split("**:");
                const bold = parts[0].replace("**", "");
                content = (
                  <>
                    <strong className="text-cv-text-primary font-bold">
                      {bold}:
                    </strong>
                    {parts[1]}
                  </>
                );
              }
              return (
                <li key={idx} className="flex gap-4">
                  <span className="text-cv-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-cv-accent flex-shrink-0" />
                  <span>{content}</span>
                </li>
              );
            })}
          </ul>,
        );
      } else if (line.trim() === "") {
        continue;
      } else {
        const processInlineFormatting = (text: string) => {
          const parts: (string | JSX.Element)[] = [];
          let lastIndex = 0;
          let partKey = 0;

          const codeRegex = /`([^`]+)`/g;
          let match;

          while ((match = codeRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
              const textPart = text.substring(lastIndex, match.index);
              parts.push(textPart);
            }
            parts.push(
              <code
                key={partKey++}
                className="bg-cv-accent/10 text-cv-accent px-2 py-0.5 rounded text-sm font-mono border border-cv-accent/20"
              >
                {match[1]}
              </code>,
            );
            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
          }

          return parts.length > 0 ? parts : text;
        };

        elements.push(
          <p
            key={key++}
            className="text-cv-text-secondary leading-relaxed mb-6 text-lg"
          >
            {processInlineFormatting(line)}
          </p>,
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-cv-bg selection:bg-cv-accent/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-cv-text-secondary hover:text-cv-accent font-bold text-xs uppercase tracking-widest mb-16 transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-cv-border flex items-center justify-center group-hover:border-cv-accent/50 group-hover:bg-cv-accent/5">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to feed
        </Link>

        <article>
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-cv-text-secondary uppercase tracking-widest mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cv-accent/60" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cv-accent/60" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-cv-text-primary mb-8 leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            <div className="mb-16">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-[21/9] object-cover rounded-3xl border border-cv-border/50 shadow-2xl"
              />
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
        </article>

        <div className="mt-20 pt-12 border-t border-cv-border">
          <Link
            to="/"
            className="group flex items-center gap-2 text-cv-text-secondary hover:text-cv-accent font-bold text-xs uppercase tracking-widest transition-all"
          >
            <div className="w-8 h-8 rounded-full border border-cv-border flex items-center justify-center group-hover:border-cv-accent/50 group-hover:bg-cv-accent/5">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Explore more articles
          </Link>
        </div>
      </div>
    </div>
  );
}
