import { Star } from "lucide-react";
import { Board } from "../features/board";
import { VisibilityOption } from "@/features/visibility-option";

export default function Home() {
  return (
    <div className="h-screen bg-blue-800/80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-black/20 py-4  px-2">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-xl font-semibold">
            Kiểm Thử Phần Mềm - Nhóm 24
          </h1>
          <VisibilityOption />

          <button className="text-white opacity-80 hover:opacity-100">
            <Star className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col px-2 flex-1">
        {/* Board */}
        <Board />
      </div>
    </div>
  );
}
