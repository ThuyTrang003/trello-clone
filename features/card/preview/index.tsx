"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ITask } from "@/types/board-type";
import {
  CheckCircle2,
  FilePenLine,
  MessageCircle,
  Eye,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Date } from "./date";
import { useBoardStore } from "@/stores/board-store";
import { useSortable } from "@dnd-kit/sortable";

interface CardProps {
  task: ITask;
  listId: string;
}

export function Card({ task, listId }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { updateTaskDone } = useBoardStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(0,${transform.y}px,  0)`
          : undefined,
        transition,
      }}
      {...attributes}
      {...listeners}
      className="bg-[#161B22] p-3 rounded-md space-y-2 relative cursor-grab "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute top-4 right-1 bg-[#161B22] px-1  w-5 h-5 z-1">
          <FilePenLine className="w-4 h-4 text-gray-400   " />
        </div>
      )}
      {task.labels && (
        <div className="flex gap-1 flex-wrap">
          {task.labels.map((label, index) => (
            <Badge
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
      )}

      <div className="flex items-center ">
        {isHovered && (
          <Checkbox
            id="doneState"
            checked={task.isDone}
            onCheckedChange={() => {
              updateTaskDone(listId, task.id, !task.isDone);
            }}
          />
        )}

        <h3
          className={cn(
            "text-gray-400 text-sm transition-transform duration-300 ease-in-out line-clamp-1 ",
            isHovered ? "translate-x-2" : "translate-x-0"
          )}
        >
          {task.title}
        </h3>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {task.isSubscribe && <Eye className="w-4 h-4 text-gray-400" />}

        {task.comments && (
          <div className="flex items-center gap-1 text-gray-400">
            <MessageCircle className="w-3 h-3" />
            <span className="text-xs">{task.comments}</span>
          </div>
        )}

        <Date task={task} />

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
      </div>
      {task.assignees && (
        <div className="flex justify-end ">
          {task.assignees.map((assignee, index) => (
            <Avatar key={index} className="w-6 h-6 border-2 border-[#161B22]">
              <AvatarFallback className="bg-green-600 text-xs">
                {assignee}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}
    </div>
  );
}
