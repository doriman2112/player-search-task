import { Player } from '@/types/player';

interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}

// TODO: Implement the PlayerTable component
//
// Requirements:
// - Fixed-height scrollable container (e.g. h-[500px] overflow-auto)
// - Columns: Player ID | Name | Email | Balance | Status
// - Status comes from player.online (boolean) — show as a coloured badge:
//     Online = green,  Offline = grey
// - When loading=true, show skeleton rows instead of real data
// - Sortable column headers (click to sort asc/desc) — bonus feature
// - Only render rows that are VISIBLE in the scroll area.
//   See Edge Case #4 in the README (virtualization).
//
// Available ShadCN components:
//   import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
//   import { Badge } from '@/components/ui/badge';
//   import { Skeleton } from '@/components/ui/skeleton';  ← run: npx shadcn@latest add skeleton
//
// Virtualization library (needs installing):
//   npm install @tanstack/react-virtual
//   import { useVirtualizer } from '@tanstack/react-virtual';

const PlayerTable: React.FC<PlayerTableProps> = ({ players, loading }) => {
  // TODO: implement

  return (
    <div className="rounded-lg border border-border p-4 text-muted-foreground text-sm space-y-1">
      <p>TODO: Implement PlayerTable — see requirements above</p>
      <p>Players received: {players.length} | Loading: {String(loading)}</p>
    </div>
  );
};

export default PlayerTable;
