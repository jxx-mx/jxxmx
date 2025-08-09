"use client";

import { Star } from "lucide-react";
import { deleteKeyword } from "@/app/_actions";

export function WatchListItem({
  item,
}: {
  item: { id: string; keyword: string; createdAt: string };
}) {
  return (
    <li className="flex items-center justify-between w-full pb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center text-sm font-medium border border-foreground/50">
          {item.keyword.slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="text-xs font-medium capitalize">{item.keyword}</p>
          <p className="text-[10px] text-foreground/50">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <button className="p-1" onClick={() => deleteKeyword(item.id)}>
          <Star fill="currentColor" className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
