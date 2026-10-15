"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAddToDictionary,
  useDeleteWord,
  useWords,
  type WordsKind,
} from "@/lib/queries";
import type { Word } from "@/lib/types";
import { Dashboard } from "../Dashboard/Dashboard";
import { WordsPagination } from "../WordsPagination/WordsPagination";
import { WordsTable } from "../WordsTable/WordsTable";
import { AddWordModal } from "../WordForm/AddWordModal";
import { EditWordModal } from "../WordForm/EditWordModal";
import styles from "./WordsView.module.css";

export function WordsView({ kind }: { kind: WordsKind }) {
  const isOwn = kind === "own";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [isIrregular, setIsIrregular] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(
    isOwn && searchParams.get("add") === "true",
  );
  const [wordToEdit, setWordToEdit] = useState<Word | null>(null);

  const debouncedKeyword = useDebounce(keyword.trim(), 300);

  const words = useWords(kind, {
    keyword: debouncedKeyword,
    category,
    isIrregular,
    page,
  });
  const deleteWord = useDeleteWord();
  const addToDictionary = useAddToDictionary();

  function handleKeywordChange(value: string) {
    setKeyword(value);
    setPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setIsIrregular(value === "verb" ? false : undefined);
    setPage(1);
  }

  function handleIsIrregularChange(value: boolean) {
    setIsIrregular(value);
    setPage(1);
  }

  function handleDelete(word: Word) {
    const isLastWordOnPage = words.data?.results.length === 1;

    deleteWord.mutate(word._id, {
      onSuccess: () => {
        if (isLastWordOnPage && page > 1) setPage(page - 1);
      },
    });
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
    if (searchParams.get("add")) router.replace("/dictionary");
  }

  return (
    <div>
      <Dashboard
        keyword={keyword}
        category={category}
        isIrregular={isIrregular}
        onKeywordChange={handleKeywordChange}
        onCategoryChange={handleCategoryChange}
        onIsIrregularChange={handleIsIrregularChange}
        onAddWordClick={isOwn ? () => setIsAddModalOpen(true) : undefined}
      />

      <div className={styles.content}>
        {words.isPending && <p className={styles.loading}>Loading words...</p>}
        {words.isError && <p className={styles.error}>Unable to load words.</p>}

        {words.data && (
          <>
            <WordsTable
              words={words.data.results}
              variant={isOwn ? "own" : "recommend"}
              disabled={deleteWord.isPending || addToDictionary.isPending}
              onEdit={setWordToEdit}
              onDelete={handleDelete}
              onAdd={(word) => addToDictionary.mutate(word._id)}
            />

            <WordsPagination
              page={page}
              totalPages={words.data.totalPages ?? 0}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {isAddModalOpen && <AddWordModal onClose={closeAddModal} />}
      {wordToEdit && (
        <EditWordModal word={wordToEdit} onClose={() => setWordToEdit(null)} />
      )}
    </div>
  );
}
