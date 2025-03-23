import { cn } from "@/lib/utils";
import { ITask } from "@/types/board-type";
import { checkDate } from "@/utils/check-date";
import { Clock } from "lucide-react";

export function Date({ task }: { task: ITask }) {
  return (
    <>
      {task.startDate && !task.dueDate && (
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{`Đã bắt đầu: ${task.startDate}`}</span>
        </div>
      )}
      {task.dueDate && !task.startDate && (
        <div
          className={cn(
            "flex items-center gap-1 p-1 rounded-md",
            task.isDone
              ? "bg-green-400 text-black"
              : checkDate(task.dueDate)
              ? "bg-red-600/40 text-gray-400"
              : "bg-yellow-300 text-black"
          )}
        >
          <Clock className="w-3 h-3" />
          <span className="text-xs">{`${task.dueDate}`}</span>
        </div>
      )}
      {task.startDate && task.dueDate && (
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{`${task.startDate} - ${task.dueDate}`}</span>
        </div>
      )}
    </>
  );
}
