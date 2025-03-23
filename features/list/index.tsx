"use client";
import { useEffect, useState } from "react";
import { BookCopy, EllipsisVertical } from "lucide-react";
import { OptionsDropdown } from "./option-dropdown";
import { IList } from "@/types/board-type";
import { useBoardStore } from "@/stores/board-store";
import { AddCard } from "./add-card";
import { CreateFromSamplePopover } from "./create-from-sample-popover";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { DragDropTasks } from "./drag-drop-tasks";
import { ListHeader } from "./list-header";

interface BoardProps {
  list: IList;
}

export function List({ list }: BoardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: list.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px,0,  0)`
          : undefined,
        transition,
      }}
      className="h-fit rounded-md "
    >
      <div className="flex-shrink-0 w-60">
        <div className="bg-[#0D1117] rounded-md pb-3 pl-3 pr-2 space-y-2 ">
          <div
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing h-4 mb-0 "
          />
          <ListHeader list={list} />

          <DragDropTasks list={list} />
          <div className="flex items-center gap-1 pl-1 pt-1">
            <AddCard list={list} />
            <CreateFromSamplePopover>
              <Button
                size={"sm"}
                className=" text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent"
              >
                <BookCopy className="w-4 h-4 text-gray-400 " />
              </Button>
            </CreateFromSamplePopover>
          </div>
        </div>
      </div>
    </div>
  );
}
