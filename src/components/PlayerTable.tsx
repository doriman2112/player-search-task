import { Loader2 } from "lucide-react";
import type { Player } from "@/types/player";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const SKELETON_ROWS = 10;

export const PlayerTable = ({
  players,
  loading,
  onSort,
  sortBy,
  sortDirection,
}: PlayerTableProps) => {
  if (loading && !players.length) {
    return (
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {COLUMNS.map(({ key, label }) => (
                <TableHead key={key} className="text-muted-foreground">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: SKELETON_ROWS }, (_, row) => (
              <TableRow key={row} className="hover:bg-transparent">
                {COLUMNS.map(({ key }) => (
                  <TableCell key={key}>
                    <Skeleton className="h-5 w-full max-w-[8rem]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!players.length) {
    return (
      <div className="rounded-md border border-dashed bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
        No results found, Maybe try a different search? :P
      </div>
    );
  }

  return (
    <div className="relative rounded-md border bg-card">
      {loading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/70 backdrop-blur-[1px]"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 shadow-sm">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden />
            <span className="text-sm text-muted-foreground">Loading…</span>
          </div>
        </div>
      ) : null}
      <Table
        className={cn(loading && "opacity-50 pointer-events-none")}
        aria-busy={loading}
      >
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {COLUMNS.map(({ key, label }) => {
              const active = sortBy === key;
              return (
                <TableHead
                  key={key}
                  className="text-muted-foreground"
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
                    className="inline-flex w-full items-center gap-1.5 rounded px-1 py-1 text-left font-medium text-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                  >
                    <span>{label}</span>
                    {active ? (
                      <span className="tabular-nums text-foreground" aria-hidden>
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    ) : null}
                  </button>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.playerId}>
              <TableCell className="font-mono text-xs">{player.playerId}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.email}</TableCell>
              <TableCell>${player.balance.toFixed(2)}</TableCell>
              <TableCell>{player.online ? "🟢" : "🔴"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
