import { useLoaderData, useFetcher } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import action from "./updateUserAction";
import loader from "./editLoader";
import Spinner from "~/components/Spinner";

export default function UpdateForm(): JSX.Element {
  const { user, roles } = useLoaderData<typeof loader>();
  const updateFetcher = useFetcher<typeof action>();
  return (
    <>
      {updateFetcher.state === "idle" && (
        <updateFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="userId" value={user?.id} />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email du utilisateur"
            ariaLabel="Email du  utilisateur"
            defaultValue={user?.email}
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Nouveau mot de passe du utilisateur"
            ariaLabel="Nouveau mot de passe du utilisateur"
            placeholder="Laissez vide pour conserver le mot de passe actuel"
          />
          <label htmlFor="role">Rôle de l&apos;utilisateur</label>
          <select id="role" name="roleId" aria-label="Rôle du  utilisateur">
            {roles.map((role) => (
              <option
                key={role.id}
                value={role.id}
                selected={user?.roleId === role.id}
              >
                {role.name}
              </option>
            ))}
          </select>
          <Button label="Modifier" ariaLabel="Modifier l'utilisateur" />
        </updateFetcher.Form>
      )}
      {updateFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
