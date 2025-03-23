import { IList, ITask } from "@/types/board-type";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Assignees } from "./preview/assignees";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Pencil, Plus } from "lucide-react";
import { SubscribeButton } from "./subscribe-button";
import { LabelsView } from "./labels-view";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CardDialogProps {
  children: React.ReactNode;
  task: ITask;
  list: IList;
}

export function CardDialog({ children, task, list }: CardDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-[800px] text-gray-300 bg-[#323940] border-0 p-0">
        <DialogTitle className="hidden"></DialogTitle>

        <ScrollArea className="max-h-[90vh] px-6 pt-10 pb-2">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-sm ">trong danh sách {list.title}</p>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-4 gap-4 pt-4">
            {/* Left column */}
            <div className="col-span-3 space-y-4 ">
              {/* Members and Status */}
              <div className="flex items-center flex-wrap gap-4 pl-8">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">Thành viên</span>
                  <div className="flex items-center gap-1">
                    <Assignees assignees={task.assignees} />
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className=" text-xs bg-white/10">
                        <Plus className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {task.labels && task.labels.length > 0 && (
                  <LabelsView labels={task.labels} />
                )}

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">Thông báo</span>
                  <SubscribeButton task={task} list={list} />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 ">
                <div className="flex items-center gap-4">
                  <Pencil className="w-4 h-4" />
                  <h3 className="font-medium">Mô tả</h3>
                </div>
                <div className="ml-8">
                  <textarea
                    className="w-full min-h-[100px] p-2  border rounded-md bg-transparent"
                    placeholder="Thêm mô tả chi tiết hơn..."
                    // value={task.description || ""}
                    onChange={(e) => {
                      // Xử lý cập nhật description
                    }}
                  />
                </div>
              </div>

              {/* Activity */}
              {/* <div className="space-y-2">
                <h3 className="font-medium">Hoạt động</h3>
                <div className="space-y-2">
                  <textarea
                    className="w-full p-2 border rounded-md bg-transparent"
                    placeholder="Viết bình luận..."
                  />
                </div>
              </div> */}
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Thêm vào thẻ</h3>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    👥 Tham gia
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    👤 Thành viên
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    🏷️ Nhãn
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    ✓ Việc cần làm
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    📎 Đính kèm
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    📅 Ngày
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    🖼️ Ảnh bìa
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    ⚙️ Trường tùy chỉnh
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tự động hóa</h3>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    + Thêm nút
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Thao tác</h3>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    ↗️ Di chuyển
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    📋 Sao chép
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    🔄 Tạo mẫu
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    💾 Lưu trữ
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    ↪️ Chia sẻ
                  </Button>
                  <Button
                    className="w-full justify-start text-gray-300 bg-white/10"
                    size="sm"
                  >
                    🗑️ Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
