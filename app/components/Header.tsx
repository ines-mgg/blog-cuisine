import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="border-b py-4">
      <nav className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-black">Cook</span>
          <span className="text-[#FF6B35]">r</span>
        </Link>

        <div className="flex gap-8">
          <Link to="/" className="hover:text-[#FF6B35] transition">
            Accueil
          </Link>
          <Link to="/recipes" className="hover:text-[#FF6B35] transition">
            Recettes
          </Link>
        </div>

        <div>
          <Link to="/login" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
