import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alex Morgan</h1>
              <p className="text-xs text-gray-600">
                Thoughts on Web Development
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
