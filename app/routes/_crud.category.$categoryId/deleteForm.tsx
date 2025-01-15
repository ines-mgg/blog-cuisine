import { useFetcher } from "@remix-run/react";
import action from "./deleteCategoryAction";
import Spinner from "~/components/Spinner";

interface IProps {
  categoryId: string;
}

export default function DeleteForm({ categoryId }: IProps): JSX.Element {
  const deleteFetcher = useFetcher<typeof action>();
  return (
    <>
      {deleteFetcher.state === "idle" && (
        <deleteFetcher.Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="categoryId" value={categoryId} />
          <button className="bg-red-900 rounded flex items-center p-2 text-white">
            <span
              className="icon-[mdi--delete]"
              style={{ width: "20px", height: "20px" }}
            ></span>
          </button>
        </deleteFetcher.Form>
      )}
      {deleteFetcher.state === "submitting" && <Spinner />}
    </>
  );
}