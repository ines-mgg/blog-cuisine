import { useLoaderData, useFetcher } from "@remix-run/react";
import action from "./updateCategoryAction";
import loader from "../_crud.category.$categoryId/getCategory";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Spinner from "~/components/Spinner";

export default function UpdateForm(): JSX.Element {
  const { category } = useLoaderData<typeof loader>();
  const updateFetcher = useFetcher<typeof action>();
  return (
    <>
      {updateFetcher.state === "idle" && (
        <updateFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="categoryId" value={category?.id} />
          <Input
            id="name"
            name="name"
            type="text"
            label="Modifier le nom de la catégorie"
            ariaLabel="Modifier le nom de la catégorie"
            defaultValue={category?.name}
          />
          <Button label="Modifier" ariaLabel="Modifier la catégorie" />
        </updateFetcher.Form>
      )}
      {updateFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
