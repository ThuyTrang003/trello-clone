import { Lock } from "lucide-react";

export function VisibilityOption() {
  return (
    <button className="flex items-center gap-1.5 text-white bg-white/20 hover:bg-white/30 transition-colors rounded-md px-2.5 py-1 text-sm">
      <Lock className="w-4 h-4" />
      Riêng tư
    </button>
  );
}
