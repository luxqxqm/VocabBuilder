"use client";

import Image from "next/image";
import { capitalize } from "@/lib/format";
import type { Answer } from "@/lib/types";
import { Modal } from "../Modal/Modal";
import styles from "./WellDoneModal.module.css";

interface WellDoneModalProps {
  results: Answer[];
  onClose: () => void;
}

export function WellDoneModal({ results, onClose }: WellDoneModalProps) {
  const correct = results.filter((item) => item.isDone);
  const mistakes = results.filter((item) => !item.isDone);

  return (
    <Modal onClose={onClose} width={520}>
      <h2 className={styles.title}>Well done</h2>

      <div className={styles.columns}>
        <div>
          <h3 className={styles.columnTitle}>Correct answers:</h3>
          <ul className={styles.wordList}>
            {correct.map((item) => (
              <li key={item._id}>{capitalize(item.en)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Mistakes:</h3>
          <ul className={styles.wordList}>
            {mistakes.map((item) => (
              <li key={item._id}>{capitalize(item.en)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.illustration}>
        <Image
          src="/images/book@2x.png"
          alt="Open book illustration"
          width={160}
          height={140}
        />
      </div>
    </Modal>
  );
}
