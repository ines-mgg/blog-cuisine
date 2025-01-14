import { Form } from "@remix-run/react";
import Input from "./Input";

interface IProps {
  title?: string;
  query: string | null;
  placeholder?: string;
}

export default function SearchForm({ query, title, placeholder }: IProps) {
  return (
    <Form role="search">
      <div className="flex flex-col gap-2 font-medium text-black dark:text-white">
        {title && <span> {title} </span>}
        <div className="flex gap-2">
          <Input
            id="query"
            name="query"
            type="search"
            defaultValue={query ?? undefined}
            placeholder={placeholder}
          />
          <button className="bg-[#FF6B35] rounded p-2 h-12 text-white">
            <span
              className="icon-[mdi--search]"
              style={{ width: "30px", height: "30px" }}
            ></span>
          </button>
        </div>
      </div>
    </Form>
  );
}
