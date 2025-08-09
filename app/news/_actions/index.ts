"use server";

import { NewsResponse } from "@/app/news/page";
import { NEWS_KEYWORDS } from "@/lib/constant";
import GNews from "@gnews-io/gnews-io-js";

export async function getNews(
  keyword: (typeof NEWS_KEYWORDS)[number]
): Promise<NewsResponse> {
  const client = new GNews(process.env.GNEWS_API_KEY!);

  const date = new Date();
  date.setDate(date.getDate());

  const news = await client.search(keyword, {
    lang: "en",
    country: "us",
    in: "title",
    from: date.toISOString().split("T")[0],
    to: date.toISOString().split("T")[0],
    sortby: "publish-time",
  });

  return news as NewsResponse;
}
