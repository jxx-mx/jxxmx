"use client";

import { useState, useEffect } from "react";
import { getNews } from "./_actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { NEWS_KEYWORDS } from "@/lib/constant";

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

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<string>(NEWS_KEYWORDS[0]);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await getNews(activeTab);
        setNewsData(data);
      } catch (error) {
        console.error("뉴스를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeTab]);

  return (
    <div className="container mx-auto mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">기술 뉴스</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-transparent overflow-x-auto w-full md:w-fit scrollbar-hide gap-2 justify-start flex-nowrap">
          {NEWS_KEYWORDS.map((keyword) => (
            <TabsTrigger
              key={keyword}
              value={keyword}
              className="bg-transparent rounded-full border-border px-4 w-fit flex-none"
            >
              {keyword}
            </TabsTrigger>
          ))}
        </TabsList>

        {NEWS_KEYWORDS.map((keyword) => (
          <TabsContent key={keyword} value={keyword}>
            {/* 로딩 상태 */}
            {loading && activeTab === keyword && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">
                  뉴스를 불러오는 중...
                </span>
              </div>
            )}

            {/* 뉴스 그리드 */}
            {!loading && newsData && activeTab === keyword && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsData.articles?.map((article, index) => (
                  <Card
                    key={index}
                    className="flex flex-col h-full hover:shadow-lg transition-shadow"
                  >
                    {article.image && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <CardHeader className="flex-1">
                      <div className="mb-2">
                        <Badge variant="secondary" className="block w-fit">
                          {article.source.name}
                        </Badge>
                      </div>

                      <CardTitle>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </a>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="line-clamp-3">
                        {article.description}
                      </CardDescription>

                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground">
                          {formatDate(article.publishedAt)}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          전체 기사 읽기
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* 데이터 없음 상태 */}
            {!loading &&
              newsData &&
              activeTab === keyword &&
              (!newsData.articles || newsData.articles.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    표시할 뉴스가 없습니다.
                  </p>
                </div>
              )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
