"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { X } from "lucide-react";
import { useBoardStore } from "@/stores/board-store";
import { IList } from "@/types/board-type";
interface OptionsDropdownProps {
  children?: ReactNode;
  className?: string;
  list: IList;
}
export function OptionsDropdown({
  children,
  className,
  list,
}: OptionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const removeList = useBoardStore((state) => state.removeList);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-gray-600/40",
          className
        )}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] text-gray-400 bg-[#282e33] border-0 "
      >
        <div className="flex items-center justify-between px-2 py-1.5 text-sm font-medium">
          <div />
          <span>Thao tác</span>
          <button
            className="rounded p-1 hover:bg-gray-600/40"
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
        <DropdownMenuItem>Thêm thẻ</DropdownMenuItem>
        <DropdownMenuItem>Sao chép danh sách</DropdownMenuItem>
        <DropdownMenuItem>Di chuyển danh sách</DropdownMenuItem>
        <DropdownMenuItem>
          Di chuyển tất cả thẻ trong danh sách này
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sắp xếp theo...</DropdownMenuItem>
        <DropdownMenuItem>Theo dõi</DropdownMenuItem>
        <DropdownMenuItem>
          Thêm danh sách từ các vấn đề trên Jira
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Tự động hóa</DropdownMenuItem>
        <DropdownMenuItem>Tạo quy tắc</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => removeList(list.id)}>
          Lưu trữ danh sách này
        </DropdownMenuItem>
        <DropdownMenuItem>
          Lưu trữ tất cả các thẻ trong danh sách này
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
