import { cn } from "@/lib/utils";
import type React from "react";

export const Width = ({
  children,
  width,
  className,
}: {
  children: React.ReactNode;
  width: string;
  className?: string;
}) => {
  let calcWidth: string;
  switch (width) {
    case "full":
      calcWidth = `100%`;
      break;
    default:
      calcWidth = `calc(${width} * 100% - 0.5rem)`;
      break;
  }
  return (
    <div
      style={{ flexBasis: calcWidth }}
      className={cn("gap-2 flex flex-col", className)}
    >
      {children}
    </div>
  );
};
