"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  width?: number;
  children: React.ReactNode;
}

export function Modal({ onClose, width = 515, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      style={{ "--modal-width": `${width}px` } as React.CSSProperties}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </dialog>
  );
}
