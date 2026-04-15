import { cn } from "@/lib/utils";

export const Splitter = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-[92%] h-[1.5px] mx-auto my-2", className)}></div>
  );
};
