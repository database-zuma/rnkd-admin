import { PageHeader } from "@/components/layout/page-header";
import { DataTable } from "@/components/shared/data-table/data-table";
import { getMatches } from "@/lib/data/matches";
import { matchColumns } from "./columns";

export default async function MatchesPage() {
  const matches = await getMatches();

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Matches" description="Match history and management" />
      <DataTable
        columns={matchColumns}
        data={matches}
        searchKey="id"
        searchPlaceholder="Search matches..."
      />
    </div>
  );
}
