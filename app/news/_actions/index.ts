"use server";

import { NewsResponse } from "@/app/news/page";
import { NEWS_KEYWORDS } from "@/lib/constant";

export async function getNews(
  keyword: (typeof NEWS_KEYWORDS)[number]
): Promise<NewsResponse> {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  const url = `${
    process.env.NEWS_BASE_URL
  }/everything?q=${keyword}&sortBy=popularity&apiKey=${
    process.env.NEWS_API_KEY
  }&from=${today.toISOString().split("T")[0]}&to=${
    today.toISOString().split("T")[0]
  }&sortBy=popularity&pageSize=5&page=1`;

  const news = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await news.json();

  return data;
}
