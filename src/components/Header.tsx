import { Link } from "react-router-dom";
import { BookOpen, ArrowUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cv-bg/80 backdrop-blur-md border-b border-cv-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="group flex items-center gap-3 hover:opacity-100 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-cv-accent/10 flex items-center justify-center group-hover:bg-cv-accent/20 transition-colors">
              <BookOpen className="w-5 h-5 text-cv-accent" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-cv-text-primary tracking-tight">
                Ashok Lama
              </h1>
              <p className="text-[10px] text-cv-text-secondary uppercase tracking-[0.2em] font-medium">
                Digital Journal & Portfolio
              </p>
            </div>
          </Link>

          <a
            href="https://lamaashok.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cv-accent/5 border border-cv-accent/20 text-xs font-bold text-cv-accent uppercase tracking-widest hover:bg-cv-accent hover:text-cv-bg transition-all duration-300"
          >
            Portfolio
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
