import CreateForm from "./createForm";
import action from "./createUserAction";
import loader from "./rolesLoader";

export { action, loader };

export default function NewUser() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Ajouter un utilisateur
      </span>
      <CreateForm />
    </>
  );
}
