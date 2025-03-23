import { IList } from "@/types/board-type";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "../card/preview";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "@/stores/board-store";
import { CardDialog } from "../card/card-dialog";
interface DragDropTasksProps {
  list: IList;
}
export function DragDropTasks({ list }: DragDropTasksProps) {
  const { setTasks, moveTask } = useBoardStore();

  // Xử lý khi kéo thả xong
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = list.tasks.findIndex((task) => task.id === active.id);
    const newIndex = list.tasks.findIndex((task) => task.id === over.id);

    setTasks(list.id, arrayMove(list.tasks, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={list.tasks.map((task) => task.id)}
        // strategy={verticalListSortingStrategy}
      >
        <div
          className="flex flex-col gap-2 pr-1 overflow-y-auto max-h-[calc(100vh-230px)] [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-lg
  [&::-webkit-scrollbar-track]:bg-gray-800
  [&::-webkit-scrollbar-thumb]:rounded-lg
  [&::-webkit-scrollbar-thumb]:bg-gray-600"
        >
          {list.tasks.map((task) => (
            <Card key={task.id} task={task} list={list} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
