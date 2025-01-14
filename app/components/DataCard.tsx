import { Link } from "@remix-run/react";

type DataCardProps = {
  id: string;
  title: string;
  link: string;
};

export default function DataCard({ id, title, link }: DataCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl">
      <div className="p-6">
        <Link
          to={link}
          className="text-xl font-semibold hover:text-[#FF6B35] transition"
        >
          {title}
        </Link>

        <p className="text-gray-600 mt-2 line-clamp-3">{id}</p>
      </div>
    </div>
  );
}
