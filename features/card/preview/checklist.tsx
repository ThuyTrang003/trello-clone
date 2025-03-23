import { cn } from "@/lib/utils";
import { ITask } from "@/types/board-type";
import { CheckCircle2 } from "lucide-react";

interface ChecklistProps {
  task: ITask;
}
export function Checklist({ task }: ChecklistProps) {
  return (
    <>
      {task.checklist && (
        <div
          className={cn(
            "flex items-center gap-1",
            task.checklist.completed === task.checklist.total
              ? "text-black bg-green-400 px-1.5 py-0.5 rounded-sm"
              : "text-gray-400"
          )}
        >
          <CheckCircle2 className="w-3 h-3" />
          <span className="text-xs">
            {task.checklist.completed}/{task.checklist.total}
          </span>
        </div>
      )}
    </>
  );
}
