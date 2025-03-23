"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface CreateFromSamplePopoverProps {
  children: ReactNode;
}
export function CreateFromSamplePopover({
  children,
}: CreateFromSamplePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 p-3 bg-[#1C2026] border-gray-700"
        align="start"
      >
        <div className="absolute right-2 top-2">
          <PopoverClose asChild>
            <Button
              size={"sm"}
              variant="ghost"
              className=" text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
        </div>
        <div className="space-y-4">
          <h3 className="text-white text-center font-medium">Mẫu thẻ</h3>
          <p className="text-gray-400 text-center text-sm">
            Bạn không có mẫu. Tạo mẫu để dễ dàng sao chép các thẻ.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
            Tạo mẫu mới
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
