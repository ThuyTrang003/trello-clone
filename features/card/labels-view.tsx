import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Labels } from "./preview/labels";

interface LabelsViewProps {
  labels: {
    text: string;
    color: string;
  }[];
}

export function LabelsView({ labels }: LabelsViewProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-400">Nhãn</span>
      <div className="flex items-center gap-1">
        <Labels labels={labels} />
        <Button size="sm" className="bg-white/10 hover:bg-white/20 h-6">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
