import { useFetcher, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Textarea from "~/components/Textarea";
import action from "./updateRecipeAction";
import loader from "./editLoader";

export default function CreateForm(): JSX.Element {
  const updateFetcher = useFetcher<typeof action>();
  const { categories, recipe } = useLoaderData<typeof loader>();
  return (
    <updateFetcher.Form
      method="post"
      className="flex flex-col items-center gap-8"
    >
      <input type="hidden" name="intent" value="update" />
      <input type="hidden" name="recipeId" value={recipe?.id} />
      <Input
        id="title"
        name="title"
        type="text"
        label="Titre de la recette"
        ariaLabel="Titre de la recette"
        defaultValue={recipe?.title}
      />
      <Textarea
        id="content"
        name="content"
        label="Contenu de la recette"
        ariaLabel="Contenu de la recette"
        defaultValue={recipe?.content}
      />
      <label htmlFor="user">Catégorie de la recette</label>
      <select id="role" name="categoryId" aria-label="Catégorie de la recettte">
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
            selected={category.id === recipe?.categoryId}
          >
            {category.name}
          </option>
        ))}
      </select>
      <Button label="Modifier" ariaLabel="Modifier la recette" />
    </updateFetcher.Form>
  );
}
