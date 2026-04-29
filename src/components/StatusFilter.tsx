type Status = "all" | "online" | "offline";

interface StatusFilterProps {
  value: Status;
  onChange: (value: Status) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <div>
      <button onClick={() => onChange("all")} disabled={value === "all"}>
        All
      </button>

      <button onClick={() => onChange("online")} disabled={value === "online"}>
        Online
      </button>

      <button onClick={() => onChange("offline")} disabled={value === "offline"}>
        Offline
      </button>
    </div>
  );
};