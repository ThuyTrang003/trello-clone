"use client";
import { useEffect, useState } from "react";
import { List } from "../list";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AddListPopover } from "./add-list-popover";
import { useBoardStore } from "@/stores/board-store";
import { Card } from "../card/preview";

export function Board() {
  const { lists, setLists } = useBoardStore();
  const [mounted, setMounted] = useState(false);
  //chỉ chạy trên client-side. useEffect để ngăn nó render trên server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // Tránh render khi chưa mounted trên client

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromIndex = lists.findIndex((col) => col.id === active.id);
    const toIndex = lists.findIndex((col) => col.id === over.id);

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      setLists(arrayMove(lists, fromIndex, toIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <SortableContext
        items={lists.map((col) => col.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-3 overflow-x-auto pb-4 flex-1">
          {lists.map((list) => (
            <List key={list.id} list={list} />
          ))}
          <AddListPopover>
            <button className=" rounded bg-white/20 p-2 text-white hover:bg-white/10 text-sm flex-shrink-0 w-60 h-fit">
              + Thêm danh sách khác
            </button>
          </AddListPopover>
        </div>
      </SortableContext>
    </DndContext>
  );
}
