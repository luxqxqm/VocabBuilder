"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditWord } from "@/lib/queries";
import { editWordSchema, type EditWordValues } from "@/lib/schemas";
import type { Word } from "@/lib/types";
import { Icon } from "../Icon/Icon";
import styles from "./WordForm.module.css";

interface EditWordFormProps {
  word: Word;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditWordForm({ word, onSuccess, onCancel }: EditWordFormProps) {
  const editWord = useEditWord();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWordValues>({
    resolver: yupResolver(editWordSchema),
    defaultValues: { en: word.en, ua: word.ua },
  });

  function onSubmit(values: EditWordValues) {
    editWord.mutate(
      {
        id: word._id,
        en: values.en,
        ua: values.ua,
        category: word.category,
        isIrregular: word.isIrregular,
      },
      { onSuccess },
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <div className={styles.inputBox}>
            <input
              id="edit-word-ua"
              type="text"
              className={styles.wordInput}
              {...register("ua")}
            />
            {errors.ua && <p className={styles.error}>{errors.ua.message}</p>}
          </div>

          <label htmlFor="edit-word-ua" className={styles.languageLabel}>
            <Icon name="ukraine-logo" width={24} height={24} />
            Ukrainian
          </label>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.inputBox}>
            <input
              id="edit-word-en"
              type="text"
              className={styles.wordInput}
              {...register("en")}
            />
            {errors.en && <p className={styles.error}>{errors.en.message}</p>}
          </div>

          <label htmlFor="edit-word-en" className={styles.languageLabel}>
            <Icon name="united-kingdom-logo" width={24} height={24} />
            English
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={editWord.isPending}
        >
          Save
        </button>

        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
