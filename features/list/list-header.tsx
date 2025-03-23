"use client";
import { useBoardStore } from "@/stores/board-store";
import { IList } from "@/types/board-type";
import { useState } from "react";
import { OptionsDropdown } from "./option-dropdown";
import { EllipsisVertical } from "lucide-react";
interface ListHeaderProps {
  list: IList;
}
export function ListHeader({ list }: ListHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateListTitle = useBoardStore((state) => state.updateListTitle);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleSubmit = () => {
    if (newTitle.trim() !== "") {
      updateListTitle(list.id, newTitle.trim());
    } else {
      setNewTitle(list.title); // reset về title cũ nếu input rỗng
    }
    setIsEditing(false);
  };
  return (
    <div className="flex justify-between ">
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
          className="bg-[#1C2026]  text-white font-medium px-2 py-1 rounded flex-1 min-w-0 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden"
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
          className="text-gray-400  font-medium cursor-pointer px-2 py-1 rounded  whitespace-pre-wrap break-words min-w-0"
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
  );
}
