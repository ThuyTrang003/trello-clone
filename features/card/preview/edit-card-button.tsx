import { IList, ITask } from "@/types/board-type";
import { FilePenLine } from "lucide-react";

interface EditCardButtonProps {
  task: ITask;
}
export function EditCardButton({ task }: EditCardButtonProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-4 right-1 bg-[#161B22] px-1  w-5 h-5 z-1"
    >
      <FilePenLine className="w-4 h-4 text-gray-400   " />
    </div>
  );
}
