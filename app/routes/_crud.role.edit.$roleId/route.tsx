import UpdateForm from "./updateForm";
import action from "./updateRoleAction";
import loader from "~/routes/_crud.role.$roleId/getRole";

export { action, loader };

export default function Roles() {
  return (
    <>
      <span className="text-black font-semibold text-2xl">Modifier le rôle</span>
      <UpdateForm />
    </>
  );
}
