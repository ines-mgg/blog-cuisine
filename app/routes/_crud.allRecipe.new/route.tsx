import CreateForm from "./createForm";
import action from "./createRecipeAction";
import loader from "./createLoader";

export { action, loader };

export default function NewRecipe() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Ajouter une nouvelle recette
      </span>
      <CreateForm />
    </>
  );
}
