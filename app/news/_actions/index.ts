"use server";

import { NewsResponse } from "@/app/news/page";
import { NEWS_KEYWORDS } from "@/lib/constant";

const SOURCES = [
  "associated-press",
  "reuters",
  "bloomberg",
  "pbs-news-hour",
  "cbs-news",
  "abc-news",
];

export async function getNews(
  keyword: (typeof NEWS_KEYWORDS)[number]
): Promise<NewsResponse> {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const url = `${
    process.env.NEWS_BASE_URL
  }/everything?q=${keyword}&sources=${SOURCES.join(
    ","
  )}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}&from=${
    oneWeekAgo.toISOString().split("T")[0]
  }&to=${date.toISOString().split("T")[0]}&pageSize=5&page=1`;

  const news = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await news.json();

  return data;
}
