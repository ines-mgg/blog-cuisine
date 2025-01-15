import { useLoaderData, useFetcher } from "@remix-run/react";
import action from "./updateRoleAction";
import loader from "~/routes/_crud.role.$roleId/getRole";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Spinner from "~/components/Spinner";

export default function UpdateForm(): JSX.Element {
  const { role } = useLoaderData<typeof loader>();
  const updateFetcher = useFetcher<typeof action>();
  return (
    <>
      {updateFetcher.state === "idle" && (
        <updateFetcher.Form
          method="post"
          className="flex flex-col items-center gap-8"
        >
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="roleId" value={role?.id} />
          <Input
            id="name"
            name="name"
            type="text"
            label="Modifier le nom du rôle"
            ariaLabel="Modifier le nom du rôle"
            defaultValue={role?.name}
          />
          <Button label="Modifier" ariaLabel="Modifier le rôle" />
        </updateFetcher.Form>
      )}
      {updateFetcher.state === "submitting" && <Spinner />}
    </>
  );
}
