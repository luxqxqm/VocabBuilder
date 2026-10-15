"use client";

import { Modal } from "../Modal/Modal";
import { AddWordForm } from "./AddWordForm";
import styles from "./WordForm.module.css";

export function AddWordModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} width={455}>
      <h2 className={styles.title}>Add word</h2>

      <p className={styles.description}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>

      <AddWordForm onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
}
