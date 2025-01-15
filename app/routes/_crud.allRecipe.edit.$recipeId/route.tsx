import UpdateForm from "./updateForm";
import action from "./updateRecipeAction";
import loader from "./editLoader";

export { action, loader };

export default function RecipeEdit() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Modifier la recette
      </span>
      <UpdateForm />
    </>
  );
}
