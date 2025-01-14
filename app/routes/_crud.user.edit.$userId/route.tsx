import UpdateForm from "./updateForm";
import action from "./updateUserAction";
import loader from "./editLoader";

export { action, loader };

export default function Roles() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Modifier le rôle
      </span>
      <UpdateForm />
    </>
  );
}
