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

interface BoardProps {
  list: IList;
}

export function List({ list }: BoardProps) {
  const updateListTitle = useBoardStore((state) => state.updateListTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const handleSubmit = () => {
    if (newTitle.trim() !== "") {
      updateListTitle(list.id, newTitle.trim());
    } else {
      setNewTitle(list.title); // reset về title cũ nếu input rỗng
    }
    setIsEditing(false);
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: list.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px,0,  0)`
          : undefined,
        transition,
      }}
      {...attributes}
      {...listeners}
      className="w-64 h-fit rounded-md cursor-grab "
    >
      <div className="flex-shrink-0 w-60">
        <div className="bg-[#0D1117] rounded-md py-3 pl-3 pr-2 space-y-2">
          <div className="flex justify-between">
            {isEditing ? (
              <textarea
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                  if (e.key === "Escape") {
                    setNewTitle(list.title);
                    setIsEditing(false);
                  }
                }}
                className="bg-[#1C2026] text-white font-medium px-2 py-1 rounded flex-1 min-w-0 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden"
                autoFocus
                rows={1}
                style={{ height: "auto" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
            ) : (
              <p
                className="text-gray-400 font-medium cursor-pointer px-2 py-1 rounded  flex-1 whitespace-pre-wrap break-words min-w-0"
                onClick={() => setIsEditing(true)}
              >
                {list.title}
              </p>
            )}
            <OptionsDropdown list={list}>
              <div className="text-white opacity-80 hover:opacity-100">
                <EllipsisVertical className="w-5 h-5" />
              </div>
            </OptionsDropdown>
          </div>

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
