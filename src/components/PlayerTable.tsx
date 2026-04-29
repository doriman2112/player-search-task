import type { Player } from "@/types/player";

interface PlayerTableProps {
  players: Player[];
  loading: boolean;
  onSort: (column: keyof Player) => void;
  sortBy: keyof Player | null;
  sortDirection: "asc" | "desc";
}

const COLUMNS: ReadonlyArray<{ key: keyof Player; label: string }> = [
  { key: "playerId", label: "Player ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "balance", label: "Balance" },
  { key: "online", label: "Status" },
];

export const PlayerTable = ({
  players,
  loading,
  onSort,
  sortBy,
  sortDirection,
}: PlayerTableProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!players.length) {
    return <div>No results found, Maybe try a different search? :P</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {COLUMNS.map(({ key, label }) => {
              const active = sortBy === key;
              return (
                <th
                  key={key}
                  scope="col"
                  className="text-left text-sm font-medium text-muted-foreground border-b border-border"
                  aria-sort={
                    active
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => onSort(key)}
                    className="inline-flex items-center gap-1.5 py-2 pr-2 -ml-1 pl-1 rounded hover:bg-muted/80 hover:text-foreground transition-colors w-full text-left font-medium"
                  >
                    <span>{label}</span>
                    {active ? (
                      <span className="text-foreground tabular-nums" aria-hidden>
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    ) : null}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.playerId}>
              <td>{player.playerId}</td>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>${player.balance.toFixed(2)}</td>
              <td>{player.online ? "🟢" : "🔴"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
