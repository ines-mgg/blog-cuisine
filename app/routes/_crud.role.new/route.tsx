import CreateForm from "./createForm";
import action from "./createRoleAction";

export { action };

export default function NewRole() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Ajouter un nouveau rôle
      </span>
      <CreateForm />
    </>
  );
}
