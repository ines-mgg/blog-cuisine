import CreateForm from "./createForm";
import action from "./createCategoryAction";

export { action };

export default function NewCategory() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Ajouter une nouvelle catégorie
      </span>
      <CreateForm />
    </>
  );
}
