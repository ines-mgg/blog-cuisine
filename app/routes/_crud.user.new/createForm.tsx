import { useFetcher, useLoaderData } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import action from "./createUserAction";
import loader from "./rolesLoader";
import Spinner from "~/components/Spinner";

export default function CreateForm(): JSX.Element {
  const createFetcher = useFetcher<typeof action>();
  const roles = useLoaderData<typeof loader>();
  return (
    <>
      {createFetcher.state === "idle" && (
        <createFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="create" />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email du nouveau utilisateur"
            ariaLabel="Email du nouveau utilisateur"
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Mot de passe du nouveau utilisateur"
            ariaLabel="Mot de passe du nouveau utilisateur"
          />
          <label htmlFor="role">Rôle du nouveau utilisateur</label>
          <select
            id="role"
            name="roleId"
            aria-label="Rôle du nouveau utilisateur"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <Button label="Créer" ariaLabel="Créer l'utilisateur" />
        </createFetcher.Form>
      )}
      {createFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
