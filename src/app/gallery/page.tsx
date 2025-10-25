import GalleryClient from "./GalleryClient";

const API_URL =
  "https://newsapi.timesmed.com/WebAPI/getnewslist?siteId=4&language=English";

type GalleryDetail = { fileName?: string; file?: string };
type Gallery = {
  galleryMaster_id?: number;
  galleryMaster_Title?: string;
  image?: string;
  galleryDetailList?: GalleryDetail[];
};

export default async function GalleryPage() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const json = await res.json();
    const galleries = (json?.data?.galleries ?? []) as Gallery[];

    return <GalleryClient galleries={galleries} />;
  } catch (error) {
    console.error("Gallery fetch error", error);
    return <GalleryClient galleries={[]} />;
  }
}
