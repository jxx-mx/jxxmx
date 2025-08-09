import { fetchWatchList } from "@/app/_actions";
import { Button } from "@/components/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WatchListItem } from "@/components/watch-list-item";
import { Plus } from "lucide-react";

export async function WatchList() {
  const watchList = await fetchWatchList();

  return (
    <div className="mt-8">
      <p className="text-xs mb-4 font-semibold text-foreground">와치리스트</p>
      <ul>
        {watchList.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full bg-secondary rounded-2xl p-8">
            <p className="text-sm font-medium text-foreground mb-4">
              와치리스트 추가
            </p>
            <p className="text-xs text-foreground/50 mb-4 text-center">
              관심있는 키워드를 추가해보세요. <br />
              관련 소식을 가장 빠르게 알려드릴게요
            </p>
            <Button variant="default" size="lg">
              추가하기
            </Button>
          </div>
        )}
        {watchList.map((item) => (
          <WatchListItem key={item.id} item={item} />
        ))}
        {watchList.length >= 1 && (
          <li>
            <button className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center text-sm font-medium border border-dashed border-foreground/30">
                <Plus className="w-4 h-4 text-foreground/30" />
              </div>
              <p className="text-xs font-semibold text-foreground/30">추가</p>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export function WatchListSkeleton() {
  return (
    <div className="mt-8">
      <p className="text-xs mb-4 font-semibold text-foreground">와치리스트</p>
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between w-full pb-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton
                className={`h-4 ${
                  index === 0
                    ? "w-24"
                    : index === 1
                    ? "w-32"
                    : index === 2
                    ? "w-28"
                    : index === 3
                    ? "w-36"
                    : "w-20"
                }`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
