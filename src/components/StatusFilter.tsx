import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Status = "all" | "online" | "offline";

interface StatusFilterProps {
  value: Status;
  onChange: (value: Status) => void;
}

const isStatus = (v: string | undefined): v is Status =>
  v === "all" || v === "online" || v === "offline";

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <ToggleGroup
      variant="outline"
      spacing={0}
      multiple={false}
      value={[value]}
      onValueChange={(next) => {
        const selected = next[0];
        if (isStatus(selected)) onChange(selected);
      }}
      aria-label="Filter by online status"
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="online">Online</ToggleGroupItem>
      <ToggleGroupItem value="offline">Offline</ToggleGroupItem>
    </ToggleGroup>
  );
};
