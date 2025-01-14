import { NavLink, Link } from "@remix-run/react";
import { useState } from "react";

interface IProps {
  navLinks: {
    link: string;
    label: string;
  }[];
}

export default function DashboardHeader({ navLinks }: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-20 p-2 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-black">Cook</span>
          <span className="text-[#FF6B35]">r</span>
        </Link>
      </div>
      <button
        className="p-2 bg-[#FF6B35] text-white rounded flex items-center fixed top-16 left-2"
        onClick={() => setIsMenuOpen(true)}
      >
        <span
          className="icon-[mdi--menu]"
          style={{ width: "24px", height: "24px" }}
        ></span>
      </button>
      <nav
        className={`fixed p-2 top-0 left-0 h-full w-60
                    shadow-lg transform transition-transform duration-300
                    flex flex-col items-center gap-4 text-black dark:text-white
                    bg-white dark:bg-gray-950 z-10
                    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ marginTop: "56px" }}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 bg-[#FF6B35] text-white rounded flex items-center"
          >
            <span
              className="icon-[mdi--close]"
              style={{ width: "24px", height: "24px" }}
            ></span>
          </button>
        </div>
        {navLinks.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.link}
            className={({ isActive }) =>
              `p-2 text-lg hover:bg-gray-200 dark:hover:bg-gray-800 rounded w-full text-center ${
                isActive ? "border-b-2 border-[#FF6B35]" : ""
              }`
            }
          >
            {navItem.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
