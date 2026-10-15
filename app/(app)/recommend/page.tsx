import type { Metadata } from "next";
import { Suspense } from "react";
import { WordsView } from "@/components/WordsView/WordsView";

export const metadata: Metadata = { title: "Recommend" };

export default function RecommendPage() {
  return (
    <Suspense>
      <WordsView kind="all" />
    </Suspense>
  );
}
