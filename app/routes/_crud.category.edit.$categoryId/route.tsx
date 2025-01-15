import UpdateForm from "./updateForm";
import action from "./updateCategoryAction";
import loader from "~/routes/_crud.category.$categoryId/getCategory";

export { action, loader };

export default function CategoryEdit() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Modifier le rôle
      </span>
      <UpdateForm />
    </>
  );
}
