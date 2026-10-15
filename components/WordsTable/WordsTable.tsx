"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { capitalize } from "@/lib/format";
import type { Word } from "@/lib/types";
import { Icon } from "../Icon/Icon";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./WordsTable.module.css";

interface WordsTableProps {
  words: Word[];
  variant: "own" | "recommend";
  disabled?: boolean;
  onEdit?: (word: Word) => void;
  onDelete?: (word: Word) => void;
  onAdd?: (word: Word) => void;
}

export function WordsTable({
  words,
  variant,
  disabled,
  onEdit,
  onDelete,
  onAdd,
}: WordsTableProps) {
  const isOwn = variant === "own";
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const columns: ColumnDef<Word>[] = [
    {
      id: "en",
      header: () => (
        <div className={styles.heading}>
          <span>Word</span>
          <Icon name="united-kingdom-logo" width={24} height={24} />
        </div>
      ),
      cell: ({ row }) => capitalize(row.original.en),
    },
    {
      id: "ua",
      header: () => (
        <div className={styles.heading}>
          <span>Translation</span>
          <Icon name="ukraine-logo" width={24} height={24} />
        </div>
      ),
      cell: ({ row }) => capitalize(row.original.ua),
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => capitalize(row.original.category),
    },
  ];

  if (isOwn) {
    columns.push({
      id: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const progress = Math.min(100, Math.max(0, row.original.progress ?? 0));

        return (
          <div className={styles.progress}>
            <span className={styles.progressValue}>{progress}%</span>
            <ProgressBar value={progress} />
          </div>
        );
      },
    });
  }

  columns.push({
    id: "actions",
    header: () => <span className={styles.visuallyHidden}>Actions</span>,
    cell: ({ row }) => {
      const word = row.original;

      if (!isOwn) {
        return (
          <button
            type="button"
            className={styles.addButton}
            disabled={disabled}
            onClick={() => onAdd?.(word)}
          >
            <span className={styles.addText}>Add to dictionary</span>
            <Icon name="arrow-right" width={15} height={9} />
          </button>
        );
      }

      const isMenuOpen = openMenuId === word._id;

      return (
        <>
          <button
            type="button"
            className={styles.menuTrigger}
            aria-label={`Actions for ${word.en}`}
            disabled={disabled}
            onClick={() => setOpenMenuId(isMenuOpen ? null : word._id)}
          >
            ···
          </button>

          {isMenuOpen && (
            <>
              <button
                type="button"
                className={styles.menuBackdrop}
                aria-label="Close menu"
                onClick={() => setOpenMenuId(null)}
              />

              <div className={styles.dropdown}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    onEdit?.(word);
                  }}
                >
                  <Icon name="edit-icon" width={16} height={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    onDelete?.(word);
                  }}
                >
                  <Icon name="trash-icon" width={16} height={16} />
                  Delete
                </button>
              </div>
            </>
          )}
        </>
      );
    },
  });

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (words.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No words found</h2>
        <p>Add a word or change the search filters.</p>
      </div>
    );
  }

  function getCellClass(columnId: string) {
    if (columnId === "category" && isOwn) return styles.categoryColumn;
    if (columnId === "actions") return styles.actionsCell;
    return undefined;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={isOwn ? styles.table : `${styles.table} ${styles.recommend}`}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={getCellClass(header.column.id)}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={getCellClass(cell.column.id)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
