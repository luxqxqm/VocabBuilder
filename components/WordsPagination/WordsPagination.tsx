import styles from "./WordsPagination.module.css";

interface WordsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function WordsPagination({
  page,
  totalPages,
  onPageChange,
}: WordsPaginationProps) {
  if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const visibleCount = Math.min(totalPages, 5);
  const pages = Array.from(
    { length: visibleCount },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <nav className={styles.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="First page"
      >
        «
      </button>

      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onPageChange(number)}
          className={page === number ? styles.active : ""}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        ›
      </button>

      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        aria-label="Last page"
      >
        »
      </button>
    </nav>
  );
}
