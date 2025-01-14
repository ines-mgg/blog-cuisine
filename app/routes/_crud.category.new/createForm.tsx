import { useFetcher } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import action from "./createCategoryAction";
import Spinner from "~/components/Spinner";

export default function CreateForm(): JSX.Element {
  const createFetcher = useFetcher<typeof action>();
  return (
    <>
      {createFetcher.state === "idle" && (
        <createFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="create" />
          <Input
            id="name"
            name="name"
            type="text"
            label="Nom de la nouvelle catégorie"
            ariaLabel="Nom de la nouvelle catégorie"
          />
          <Button label="Créer" ariaLabel="Créer la catégorie" />
        </createFetcher.Form>
      )}
      {createFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
