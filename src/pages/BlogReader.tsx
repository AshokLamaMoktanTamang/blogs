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
            className="text-4xl font-bold text-gray-900 mb-6 mt-8"
          >
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key++}
            className="text-3xl font-bold text-gray-900 mb-4 mt-8"
          >
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key++}
            className="text-2xl font-bold text-gray-900 mb-3 mt-6"
          >
            {line.substring(4)}
          </h3>,
        );
      } else if (line.startsWith("```")) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre
            key={key++}
            className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6"
          >
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
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
            className="list-disc list-inside space-y-2 mb-6 text-gray-700"
          >
            {listItems.map((item, idx) => {
              if (item.startsWith("**") && item.includes("**:")) {
                const parts = item.split("**:");
                const bold = parts[0].replace("**", "");
                return (
                  <li key={idx}>
                    <strong className="font-semibold text-gray-900">
                      {bold}:
                    </strong>
                    {parts[1]}
                  </li>
                );
              }
              return <li key={idx}>{item}</li>;
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
                className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm font-mono"
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
          <p key={key++} className="text-gray-700 leading-relaxed mb-6">
            {processInlineFormatting(line)}
          </p>,
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog List
        </Link>

        <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-10">
          <header className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="text-gray-600">by {post.author}</div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>
        </article>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog List
          </Link>
        </div>
      </div>
    </div>
  );
}
