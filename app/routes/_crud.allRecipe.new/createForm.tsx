import { useFetcher, useLoaderData } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Textarea from "~/components/Textarea";
import action from "./createRecipeAction";
import loader from "./createLoader";

export default function CreateForm(): JSX.Element {
  const createFetcher = useFetcher<typeof action>();
  const categories = useLoaderData<typeof loader>();
  return (
    <createFetcher.Form
      method="post"
      className="flex flex-col items-center gap-8"
    >
      <input type="hidden" name="intent" value="create" />
      <Input
        id="title"
        name="title"
        type="text"
        label="Titre de la recette"
        ariaLabel="Titre de la recette"
      />
      <Textarea
        id="content"
        name="content"
        label="Contenu de la recette"
        ariaLabel="Contenu de la recette"
      />
      <label htmlFor="user">Catégorie de la recette</label>
      <select id="role" name="categoryId" aria-label="Catégorie de la recettte">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Button label="Créer" ariaLabel="Créer la recette" />
    </createFetcher.Form>
  );
}
