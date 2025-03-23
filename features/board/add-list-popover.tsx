import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBoardStore } from "@/stores/board-store";
import { useState } from "react";
interface AddListPopoverProps {
  children: React.ReactNode;
}
export function AddListPopover({ children }: AddListPopoverProps) {
  const [title, setTitle] = useState("");
  const addList = useBoardStore((state) => state.addList);
  const handleAddList = () => {
    if (!title.trim()) return;

    addList({
      id: crypto.randomUUID(), // tạo id ngẫu nhiên
      title: title.trim(),
      tasks: [],
    });

    setTitle(""); // reset input
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddList();
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-60 p-0 border-0" align="start">
        <div className="p-2 space-y-2 bg-black">
          <Input
            placeholder="Nhập tên danh sách..."
            className="border bg-black text-white  focus-visible:ring-0 focus-visible:ring-offset-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2">
            <Button
              variant={"secondary"}
              className="flex-1"
              onClick={handleAddList}
            >
              Thêm danh sách
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
