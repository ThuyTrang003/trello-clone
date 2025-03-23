"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IList, ITask } from "@/types/board-type";
import { MessageCircle, Eye } from "lucide-react";
import { useState } from "react";
import { Date } from "./date";
import { useSortable } from "@dnd-kit/sortable";
import { CardDialog } from "../card-dialog";
import { Checklist } from "./checklist";
import { EditCardButton } from "./edit-card-button";
import { Labels } from "./labels";
import { DoneState } from "./done-state";
import { Assignees } from "./assignees";

interface CardProps {
  task: ITask;
  list: IList;
}

export function Card({ task, list }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: task.id });
  return (
    <CardDialog task={task} list={list}>
      <div
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate3d(0,${transform.y}px,  0)`
            : undefined,
          transition,
        }}
        className="bg-[#161B22] px-3 pb-3 rounded-md space-y-2 relative cursor-pointer hover:border hover:border-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing h-3 mb-0  "
        />

        {isHovered && <EditCardButton task={task} />}
        {task.labels && <Labels labels={task.labels} />}

        <div className="flex items-center ">
          {isHovered && <DoneState task={task} list={list} />}

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
          <Checklist task={task} />
        </div>
        <div className="flex justify-between ">
          <div
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing flex-1 "
          />
          {task.assignees && (
            <div className="flex">
              <Assignees assignees={task.assignees} />
            </div>
          )}
        </div>
      </div>
    </CardDialog>
  );
}
