import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IAssignee } from "@/types/board-type";

interface AssigneesProps {
  assignees: IAssignee[];
}
export function Assignees({ assignees }: AssigneesProps) {
  return (
    <div className="flex gap-1">
      {assignees.map((assignee, index) => (
        <Avatar
          key={index}
          className="w-6 h-6 "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AvatarFallback className="bg-green-600 text-xs">
            {assignee.avatar}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
