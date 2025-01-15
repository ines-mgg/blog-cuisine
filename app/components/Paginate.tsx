import { NavLink } from "@remix-run/react";

interface IProps {
  page: number;
  lastPage: number;
}

export default function Paginate({ lastPage, page }: IProps) {
  return (
    <nav aria-label="Pagination" className="flex gap-10 self-center text-black">
      {page > 1 && (
        <NavLink
          to={`?page=${page - 1}`}
          className="px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold flex items-center gap-2"
        >
          <span
            className="icon-[mdi--arrow-expand-left]"
            style={{ width: "20px", height: "20px" }}
          ></span>
          <span>Précédent</span>
        </NavLink>
      )}
      {page < lastPage && (
        <NavLink
          to={`?page=${page + 1}`}
          className="px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold flex items-center gap-2"
        >
          <span
            className="icon-[mdi--arrow-expand-right]"
            style={{ width: "20px", height: "20px" }}
          ></span>
          <span>Suivant</span>
        </NavLink>
      )}
    </nav>
  );
}
