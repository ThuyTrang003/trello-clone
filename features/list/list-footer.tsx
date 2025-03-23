import { IList } from "@/types/board-type";
import { AddCard } from "./add-card";
import { CreateFromSamplePopover } from "./create-from-sample-popover";
import { Button } from "@/components/ui/button";
import { BookCopy } from "lucide-react";
interface ListFooterProps {
  list: IList;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ListFooter({ list, setIsFocus }: ListFooterProps) {
  return (
    <div className="flex items-center gap-1 pl-1 pt-1">
      <AddCard list={list} setIsFocus={setIsFocus} />
      <CreateFromSamplePopover>
        <Button
          size={"sm"}
          className=" text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent"
        >
          <BookCopy className="w-4 h-4 text-gray-400 " />
        </Button>
      </CreateFromSamplePopover>
    </div>
  );
}
