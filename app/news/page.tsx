// pages/news/page.tsx
"use client";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import News from "../components/news/news";
import { getNews } from "../lib/data";

const fetcher = () => getNews();

export default function NewsPage() {
  const { data: newsData, error: newsError } = useSWR("newsData", fetcher);
  const { news, loading, error } = useSelector((state: RootState) => state.news);

  if (loading && !newsData) {
    return <main className="body">Loading...</main>;
  }

  if (error || newsError) {
    return <main className="body">Error: {error || newsError?.message}</main>;
  }

  return <News data={news} />;
}
