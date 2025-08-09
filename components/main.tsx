import { Suspense } from "react";
import {
  TopHeadlineNewsCarousel,
  TopHeadlineNewsCarouselSkeleton,
} from "@/components/top-headline-news-carousel";
import { WatchList, WatchListSkeleton } from "@/components/watch-list";

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
    url: string;
  };
};

export type NewsResponse = {
  totalArticles: number;
  articles: NewsArticle[];
};

export default async function Main() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<TopHeadlineNewsCarouselSkeleton />}>
        <TopHeadlineNewsCarousel />
      </Suspense>

      <Suspense fallback={<WatchListSkeleton />}>
        <WatchList />
      </Suspense>
    </div>
  );
}
