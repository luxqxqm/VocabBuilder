"use client";

import Link from "next/link";
import { capitalize } from "@/lib/format";
import { useCategories, useStatistics } from "@/lib/queries";
import { Icon } from "../Icon/Icon";
import styles from "./Dashboard.module.css";

interface DashboardProps {
  keyword: string;
  category: string;
  isIrregular: boolean | undefined;
  onKeywordChange: (keyword: string) => void;
  onCategoryChange: (category: string) => void;
  onIsIrregularChange: (isIrregular: boolean) => void;
  onAddWordClick?: () => void;
}

export function Dashboard({
  keyword,
  category,
  isIrregular,
  onKeywordChange,
  onCategoryChange,
  onIsIrregularChange,
  onAddWordClick,
}: DashboardProps) {
  const { data: categories = [] } = useCategories();
  const { data: statistics } = useStatistics();

  return (
    <section className={styles.toolbar}>
      <div className={styles.filters}>
        <div className={styles.searchField}>
          <input
            type="text"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="Find the word"
            aria-label="Find the word"
            className={styles.searchInput}
          />
          <Icon name="search" />
        </div>

        <div className={styles.categoryField}>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            aria-label="Select category"
            className={styles.categorySelect}
          >
            <option value="">Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {capitalize(item)}
              </option>
            ))}
          </select>
          <Icon name="arrow-down" width={13} height={8} />
        </div>

        {category === "verb" && (
          <fieldset className={styles.verbTypes}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="verbType"
                checked={isIrregular === false}
                onChange={() => onIsIrregularChange(false)}
              />
              Regular
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="verbType"
                checked={isIrregular === true}
                onChange={() => onIsIrregularChange(true)}
              />
              Irregular
            </label>
          </fieldset>
        )}
      </div>

      <div className={styles.actions}>
        <p className={styles.statistics}>
          To study: <span>{statistics?.totalCount ?? "-"}</span>
        </p>

        <div className={styles.actionButtons}>
          {onAddWordClick && (
            <button
              type="button"
              className={styles.addButton}
              onClick={onAddWordClick}
            >
              Add word
              <Icon name="plus" />
            </button>
          )}

          <Link href="/training" className={styles.trainingLink}>
            Train oneself
            <Icon name="arrow-right" width={15} height={9} />
          </Link>
        </div>
      </div>
    </section>
  );
}
