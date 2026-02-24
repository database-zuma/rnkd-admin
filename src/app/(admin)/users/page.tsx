import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/lib/data/users";
import { userColumns } from "./columns";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Users"
        description="1,245 registered players"
        action={
          <Button className="bg-[#D2F802] text-black font-semibold hover:brightness-110">
            + Invite User
          </Button>
        }
      />
      <DataTable
        columns={userColumns}
        data={users}
        searchKey="name"
        searchPlaceholder="Search players..."
      />
    </div>
  );
}
