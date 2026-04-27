import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Player } from '@/types/player';

interface PlayerTableProps {
  players: Player[];
}

type SortKey = keyof Pick<Player, 'playerId' | 'name' | 'email' | 'balance'>;
type SortDir = 'asc' | 'desc';

const SortIcon = ({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) => {
  if (col !== sortKey) return <ChevronsUpDown className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />;
  return sortDir === 'asc'
    ? <ChevronUp className="ml-1 inline h-3.5 w-3.5" />
    : <ChevronDown className="ml-1 inline h-3.5 w-3.5" />;
};

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const [sortKey, setSortKey] = useState<SortKey>('playerId');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...players].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
        <FileText className="h-8 w-8 opacity-40" />
        <p className="text-sm">No players found</p>
      </div>
    );
  }

  const SortTh = ({ col, label }: { col: SortKey; label: string }) => (
    <TableHead
      className="cursor-pointer select-none whitespace-nowrap hover:text-foreground transition-colors"
      onClick={() => handleSort(col)}
    >
      {label}
      <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
    </TableHead>
  );

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortTh col="playerId" label="Player ID" />
              <SortTh col="name" label="Name" />
              <SortTh col="email" label="Email" />
              <SortTh col="balance" label="Balance" />
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((player) => (
              <TableRow key={player.playerId} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-sm font-medium">{player.playerId}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-muted-foreground">{player.email}</TableCell>
                <TableCell className="font-medium">
                  ${player.balance.toFixed(2)}
                </TableCell>
                <TableCell>
                  {player.online ? (
                    <Badge variant="outline" className="text-emerald-600 border-emerald-500/40 bg-emerald-500/10 gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground border-border gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground inline-block" />
                      Offline
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlayerTable;
