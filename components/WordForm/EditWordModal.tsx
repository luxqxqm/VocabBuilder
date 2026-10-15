"use client";

import type { Word } from "@/lib/types";
import { Modal } from "../Modal/Modal";
import { EditWordForm } from "./EditWordForm";

interface EditWordModalProps {
  word: Word;
  onClose: () => void;
}

export function EditWordModal({ word, onClose }: EditWordModalProps) {
  return (
    <Modal onClose={onClose} width={515}>
      <EditWordForm word={word} onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
}
