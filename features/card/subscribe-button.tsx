import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/stores/board-store";
import { ITask } from "@/types/board-type";
import { Eye } from "lucide-react";
import { useState } from "react";

interface SubscribeButtonProps {
  task: ITask;
  list: any;
}
export function SubscribeButton({ task, list }: SubscribeButtonProps) {
  const updateTaskSubscribe = useBoardStore(
    (state) => state.updateTaskSubscribe
  );

  const handleToggleSubscribe = () => {
    updateTaskSubscribe(list.id, task.id, !task.isSubscribe);
  };
  return (
    <Button className="text-sm bg-white/10" onClick={handleToggleSubscribe}>
      <Eye className="w-4 h-4" />
      {task.isSubscribe ? "Đang theo dõi" : "Theo dõi"}
    </Button>
  );
}
