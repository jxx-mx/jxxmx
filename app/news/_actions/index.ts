"use server";

import { NewsResponse } from "@/app/news/page";
import { NEWS_KEYWORDS } from "@/lib/constant";

// const SOURCES = [
//   "associated-press",
//   "reuters",
//   "bloomberg",
//   "pbs-news-hour",
//   "cbs-news",
//   "abc-news",
// ];

export async function getNews(
  keyword: (typeof NEWS_KEYWORDS)[number]
): Promise<NewsResponse> {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  console.log(keyword);
  // const url = `${
  //   process.env.NEWS_BASE_URL
  // }/everything?q=${keyword}&sources=${SOURCES.join(
  //   ","
  // )}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}&from=${
  //   oneWeekAgo.toISOString().split("T")[0]
  // }&to=${date.toISOString().split("T")[0]}&pageSize=5&page=1`;

  // const news = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const data = await news.json();

  return dummyData;
}

const dummyData = {
  status: "ok",
  totalResults: 13,
  articles: [
    {
      source: {
        id: "abc-news",
        name: "ABC News",
      },
      author: "MICHELLE CHAPMAN AP business writer",
      title:
        "Tesla awards CEO Musk millions in shares valued at about $29 billion",
      description:
        "Tesla is awarding CEO Elon Musk 96 million shares of restricted stock valued at approximately $29 billion, just six months after a judge ordered the company to revoke his massive pay package",
      url: "https://abcnews.go.com/Business/wireStory/tesla-awards-ceo-musk-millions-shares-valued-29-124338284",
      urlToImage:
        "https://i.abcnewsfe.com/a/557c7559-918e-49fd-9a41-a6ed5bc460a6/wirestory_1abc89c2a3a4f36c376788d8cab99728_16x9.jpg?w=1600",
      publishedAt: "2025-08-04T11:24:13Z",
      content:
        "Tesla is awarding CEO Elon Musk 96 million shares of restricted stock valued at approximately $29 billion, just six months after a judge ordered the company to revoke his massive pay package. \r\nThe e… [+1231 chars]",
    },
    {
      source: {
        id: "cbs-news",
        name: "CBS News",
      },
      author: null,
      title: "Tesla grants CEO Elon Musk $29 billion pay package",
      description:
        "The new package comes just six months after a judge ordered the company to revoke his $56 billion pay package.",
      url: "https://www.cbsnews.com/news/tesla-awards-29-billion-pay-package-to-ceo-elon-musk/",
      urlToImage:
        "https://assets3.cbsnewsstatic.com/hub/i/r/2025/08/04/a611e94c-2134-406b-b941-2a5c39e638e4/thumbnail/1200x630/c94ae6d6e1c216636cf4fe485d7e86a0/gettyimages-2216312549.jpg",
      publishedAt: "2025-08-04T14:41:44Z",
      content:
        "Tesla is granting CEO Elon Musk shares totaling around $29 billion, the company announced Monday.\r\nThe new pay package for the tech billionaire, which consists of 96 million shares of restricted stoc… [+2967 chars]",
    },
    {
      source: {
        id: "cbs-news",
        name: "CBS News",
      },
      author: "Mary  Cunningham",
      title:
        "Tesla ordered to pay $200 million in punitive damages over fatal crash",
      description:
        "The plaintiffs in the wrongful death lawsuit were awarded $200 million in punitive damages by a Florida jury.",
      url: "https://www.cbsnews.com/news/tesla-liable-wrongful-death-verdict-miami-200-million-damages/",
      urlToImage:
        "https://assets1.cbsnewsstatic.com/hub/i/r/2025/08/01/d2ce631b-9943-4b1f-9333-6616b3cb4303/thumbnail/1200x630/65a040ae98126fd89311d4fa8513ddb9/gettyimages-2199484412.jpg",
      publishedAt: "2025-08-01T18:48:36Z",
      content:
        "Tesla was found partly liable in a wrongful death case involving the electric vehicle company's Autopilot system, with a jury awarding the plaintiffs $200 million in punitive damages.\r\nThe case, whic… [+802 chars]",
    },
    {
      source: {
        id: "abc-news",
        name: "ABC News",
      },
      author: "YURI KAGEYAMA AP business writer",
      title:
        "Japan's Panasonic announces a new chief at its group company as its profits barely hold up",
      description:
        "Japanese electronics and technology company Panasonic has chosen a new chief at a group company after eking out a 1.2% rise in its first quarter profit",
      url: "https://abcnews.go.com/Technology/wireStory/japans-panasonic-announces-new-chief-group-company-profits-124201034",
      urlToImage:
        "https://i.abcnewsfe.com/a/6d277ba8-f70e-408d-8255-ebc94482647c/wirestory_1e32c8948668655240fb269c8cee4920_16x9.jpg?w=1600",
      publishedAt: "2025-07-30T12:22:25Z",
      content:
        "TOKYO -- Japanese electronics and technology company Panasonic has chosen a new chief executive at a group company after eking out a 1.2% rise in its first-quarter profit. \r\nKenneth William Sain, a f… [+1848 chars]",
    },
    {
      source: {
        id: "abc-news",
        name: "ABC News",
      },
      author: "MICHAEL LIEDTKE AP technology writer",
      title: "Waymo to dispatch robotaxis in Dallas next year",
      description:
        "Waymo has announced plans to expand its robotaxi service to Dallas next year",
      url: "https://abcnews.go.com/Technology/wireStory/waymo-plans-dispatch-robotaxis-dallas-year-driverless-expansion-124154713",
      urlToImage:
        "https://i.abcnewsfe.com/a/4655852e-6017-46cf-9af5-b6147abc874e/wirestory_edcc5ce6b16ce292d23f24a27d9acb82_16x9.jpg?w=1600",
      publishedAt: "2025-07-29T00:13:50Z",
      content:
        "Robotaxi pioneer Waymo has added Dallas to its expanding list of cities where people will be able to request a driverless ride beginning sometime next year in attempt to further distance itself from … [+2198 chars]",
    },
  ],
};
