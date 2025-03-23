"use client";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/stores/board-store";
import { IList } from "@/types/board-type";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface AddCardProps {
  list: IList;
  setIsFocus?: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddCard({ list }: AddCardProps) {
  const addTask = useBoardStore((state) => state.addTask);
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    addTask(list.id, taskTitle.trim());
    setTaskTitle("");
    setIsEditing(false);
  };

  return (
    <div className="flex items-center w-full">
      {isEditing ? (
        <div className="w-full space-y-2">
          <textarea
            ref={textareaRef}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={() => {
              if (taskTitle.trim() !== "") {
                handleAddTask();
              } else {
                setIsEditing(false);
              }
            }}
            className="w-full bg-[#1C2026] resize-none rounded-md p-2 text-white text-sm placeholder:text-gray-400"
            placeholder="Nhập tiêu đề hoặc dán liên kết"
            rows={2}
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-xs"
              onClick={handleAddTask}
            >
              Thêm thẻ
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="  text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-5 h-5 " />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size={"sm"}
          className="text-gray-400 hover:text-white text-xs hover:bg-gray-800 bg-transparent justify-start flex-1"
          onClick={() => setIsEditing(true)}
        >
          <Plus className="w-5 h-5" />
          Thêm thẻ
        </Button>
      )}
    </div>
  );
}
