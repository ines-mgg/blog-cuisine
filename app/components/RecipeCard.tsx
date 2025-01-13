import { Link } from "@remix-run/react";

type RecipeCardProps = {
  id: string;
  title: string;
  content: string;
  category: {
    name: string;
  };
  createdAt: string;
};

export default function RecipeCard({
  id,
  title,
  content,
  category,
  createdAt,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl">
      <div className="p-6">
        <Link
          to={`/recipes/${id}`}
          className="text-xl font-semibold hover:text-[#FF6B35] transition"
        >
          {title}
        </Link>

        <p className="text-gray-600 mt-2 line-clamp-3">{content}</p>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>{category.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
