import { useFetcher } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import action from "./createRoleAction";
import Spinner from "~/components/Spinner";

export default function CreateForm(): JSX.Element {
  const createFetcher = useFetcher<typeof action>();
  return (
    <>
      {createFetcher.state === "idle" && (
        <createFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="create" />
          <Input
            id="name"
            name="name"
            type="text"
            label="Nom du nouveau rôle"
            ariaLabel="Nom du nouveau rôle"
          />
          <Button label="Créer" ariaLabel="Créer le rôle" />
        </createFetcher.Form>
      )}
      {createFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
