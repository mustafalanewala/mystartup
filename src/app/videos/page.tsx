import VideosClient from "./VideosClient";

const API_URL =
  "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=4&language=English";

type Video = {
  videoDetail_id?: number;
  videoTitle?: string;
  image?: string;
  fileName?: string;
};

export default async function VideosPage() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const json = await res.json();
    const videos = (json?.data?.videos ?? []) as Video[];

    return <VideosClient videos={videos} />;
  } catch (error) {
    console.error("Videos fetch error", error);
    return <VideosClient videos={[]} />;
  }
}
