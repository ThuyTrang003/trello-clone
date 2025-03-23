import { Checkbox } from "@/components/ui/checkbox";
import { useBoardStore } from "@/stores/board-store";
import { IList, ITask } from "@/types/board-type";

interface DoneStateProps {
  task: ITask;
  list: IList;
}
export function DoneState({ task, list }: DoneStateProps) {
  const { updateTaskDone } = useBoardStore();

  return (
    <Checkbox
      className="cursor-pointer"
      id="doneState"
      checked={task.isDone}
      onCheckedChange={() => {
        updateTaskDone(list.id, task.id, !task.isDone);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}
