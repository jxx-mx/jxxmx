import { fetchHeadlineNews } from "@/app/_actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame } from "lucide-react";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function TopHeadlineNewsCarousel() {
  const headlineNews = await fetchHeadlineNews();

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {headlineNews.articles?.map((article, index) => (
          <div
            key={index}
            className="flex-none snap-start w-80 p-4 flex flex-col justify-between gap-2 border bg-secondary/50 rounded-2xl"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-gradient-to-b from-red-500 to-blue-500 p-[1.5px] rounded-full">
                  <div className="bg-background rounded-full p-1">
                    <Flame
                      fill="currentColor"
                      className="w-4 h-4 text-red-500"
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold">헤드라인 뉴스</p>
              </div>
            </div>

            <div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium line-clamp-2 h-10"
              >
                {article.description}
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-8">
              {formatDate(article.publishedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopHeadlineNewsCarouselSkeleton() {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="flex-none snap-start w-80 p-4 flex flex-col justify-between gap-2 border bg-secondary/50 rounded-2xl"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-gradient-to-b from-red-500 to-blue-500 p-[1.5px] rounded-full">
                  <div className="bg-background rounded-full p-1">
                    <Flame
                      fill="currentColor"
                      className="w-4 h-4 text-red-500"
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold">헤드라인 뉴스</p>
              </div>
            </div>

            <Skeleton className="w-full h-10" />

            <Skeleton className="w-36 h-4 mt-8" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
