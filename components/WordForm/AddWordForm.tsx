"use client";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { capitalize } from "@/lib/format";
import { useCategories, useCreateWord } from "@/lib/queries";
import { addWordSchema, type AddWordValues } from "@/lib/schemas";
import { Icon } from "../Icon/Icon";
import styles from "./WordForm.module.css";

interface AddWordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddWordForm({ onSuccess, onCancel }: AddWordFormProps) {
  const { data: categories = [] } = useCategories();
  const createWord = useCreateWord();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddWordValues>({
    resolver: yupResolver(addWordSchema),
    defaultValues: { category: "verb", isIrregular: false, en: "", ua: "" },
  });

  const category = useWatch({ control, name: "category" });
  const isIrregular = useWatch({ control, name: "isIrregular" });

  function onSubmit(values: AddWordValues) {
    const payload =
      values.category === "verb"
        ? values
        : { category: values.category, en: values.en, ua: values.ua };

    createWord.mutate(payload, { onSuccess });
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className={styles.selectWrapper}>
          <select
            className={styles.categorySelect}
            aria-label="Word category"
            {...register("category")}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {capitalize(item)}
              </option>
            ))}
          </select>
          <Icon name="arrow-down" width={12} height={8} />
        </div>

        {category === "verb" && (
          <>
            <fieldset className={styles.verbTypes}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={!isIrregular}
                  onChange={() => setValue("isIrregular", false)}
                />
                Regular
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  checked={isIrregular === true}
                  onChange={() => setValue("isIrregular", true)}
                />
                Irregular
              </label>
            </fieldset>

            {isIrregular === true && (
              <p className={styles.hint}>
                Such data must be entered in the format I form-II form-III form.
              </p>
            )}
          </>
        )}
      </div>

      <div className={styles.fields}>
        <div className={styles.fieldRow}>
          <div className={styles.inputBox}>
            <input
              id="add-word-ua"
              type="text"
              placeholder="Працювати"
              className={styles.wordInput}
              {...register("ua")}
            />
            {errors.ua && <p className={styles.error}>{errors.ua.message}</p>}
          </div>

          <label htmlFor="add-word-ua" className={styles.languageLabel}>
            <Icon name="ukraine-logo" width={24} height={24} />
            Ukrainian
          </label>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.inputBox}>
            <input
              id="add-word-en"
              type="text"
              placeholder="Work"
              className={styles.wordInput}
              {...register("en")}
            />
            {errors.en && <p className={styles.error}>{errors.en.message}</p>}
          </div>

          <label htmlFor="add-word-en" className={styles.languageLabel}>
            <Icon name="united-kingdom-logo" width={24} height={24} />
            English
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={createWord.isPending}
        >
          Add
        </button>

        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
