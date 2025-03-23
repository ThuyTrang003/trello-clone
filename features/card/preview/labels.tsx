import { Badge } from "@/components/ui/badge";

interface LabelsProps {
  labels: {
    text: string;
    color: string;
  }[];
}
export function Labels({ labels }: LabelsProps) {
  return (
    <div className="flex gap-1 flex-wrap">
      {labels.map((label, index) => (
        <Badge
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-white text-[10px]"
          key={index}
          style={{
            backgroundColor: label.color,
          }}
        >
          {label.text}
        </Badge>
      ))}
    </div>
  );
}
