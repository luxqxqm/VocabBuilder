import type { Metadata } from "next";
import { Suspense } from "react";
import { WordsView } from "@/components/WordsView/WordsView";

export const metadata: Metadata = { title: "Dictionary" };

export default function DictionaryPage() {
  return (
    <Suspense>
      <WordsView kind="own" />
    </Suspense>
  );
}
