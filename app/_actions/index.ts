"use server";

import { NewsResponse } from "@/lib/types/type";
import { NEWS_KEYWORDS } from "@/lib/constant";
import GNews from "@gnews-io/gnews-io-js";

export async function fetchKeywordNews(
  keyword: (typeof NEWS_KEYWORDS)[number]
): Promise<NewsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const client = new GNews(process.env.GNEWS_API_KEY!);

  // const date = new Date();
  // date.setDate(date.getDate());

  // const news = await client.search(keyword, {
  //   lang: "en",
  //   country: "us",
  //   in: "title",
  //   from: date.toISOString().split("T")[0],
  //   to: date.toISOString().split("T")[0],
  //   sortby: "publish-time",
  // });

  console.log(keyword);

  return dummyNews;
}

const dummyNews = {
  totalArticles: 1,
  articles: [
    {
      id: "1",
      title: "Test News",
      description:
        "Test Description Test DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest Description",
      content: "Test Content",
      url: "https://www.google.com",
      image: "https://www.google.com",
      publishedAt: "2021-01-01",
      source: {
        id: "1",
        name: "Test Source",
        url: "https://www.google.com",
      },
    },
    {
      id: "2",
      title: "Test News",
      description: "Test Description",
      content: "Test Content",
      url: "https://www.google.com",
      image: "https://www.google.com",
      publishedAt: "2021-01-01",
      source: {
        id: "1",
        name: "Test Source",
        url: "https://www.google.com",
      },
    },
    {
      id: "3",
      title: "Test News",
      description: "Test Description",
      content: "Test Content",
      url: "https://www.google.com",
      image: "https://www.google.com",
      publishedAt: "2021-01-01",
      source: {
        id: "1",
        name: "Test Source",
        url: "https://www.google.com",
      },
    },
  ],
};

export async function fetchHeadlineNews(): Promise<NewsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const client = new GNews(process.env.GNEWS_API_KEY!);

  if (process.env.NODE_ENV === "development") return dummyNews as NewsResponse;

  const date = new Date();
  date.setDate(date.getDate());

  const news = await client.topHeadlines({
    lang: "en",
    country: "us",
    category: "business",
    in: "title",
    from: date.toISOString().split("T")[0],
    to: date.toISOString().split("T")[0],
    sortby: "publish-time",
  });

  return news as NewsResponse;
}

export async function fetchWatchList(): Promise<
  {
    id: string;
    keyword: string;
    createdAt: string;
  }[]
> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return dummyWatchList;
}

const dummyWatchList = [
  {
    id: "1",
    keyword: "tesla",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    keyword: "apple",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    keyword: "google",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    keyword: "meta",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    keyword: "amazon",
    createdAt: new Date().toISOString(),
  },
];

export async function deleteKeyword(id: string) {
  console.log(id);
  return dummyWatchList.filter((item) => item.id !== id);
}
