"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSubmitAnswers } from "@/lib/queries";
import type { Answer, Task } from "@/lib/types";
import { Icon } from "../Icon/Icon";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { WellDoneModal } from "../WellDoneModal/WellDoneModal";
import styles from "./TrainingRoom.module.css";

export function TrainingRoom({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const submitAnswers = useSubmitAnswers();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [translation, setTranslation] = useState("");
  const [results, setResults] = useState<Answer[] | null>(null);

  const task = tasks[index];
  const isLastTask = index === tasks.length - 1;
  const isEnglishAnswer = task.task === "en";
  const sourceWord = isEnglishAnswer ? task.ua : task.en;

  function getAnswersWithCurrent() {
    const text = translation.trim();
    if (!text) return answers;

    const currentAnswer: Answer = {
      _id: task._id,
      task: task.task,
      en: isEnglishAnswer ? text : (task.en ?? ""),
      ua: isEnglishAnswer ? (task.ua ?? "") : text,
    };

    return [...answers, currentAnswer];
  }

  function handleNext() {
    setAnswers(getAnswersWithCurrent());
    setTranslation("");
    setIndex(index + 1);
  }

  function handleSave() {
    const allAnswers = getAnswersWithCurrent();

    if (allAnswers.length === 0) {
      toast.error("Enter at least one translation");
      return;
    }

    submitAnswers.mutate(allAnswers, {
      onSuccess: (data) => setResults(data),
      onError: () => {
        toast.error("Something went wrong. Your progress was not saved");
        router.replace("/dictionary");
      },
    });
  }

  return (
    <section>
      <div className={styles.progress}>
        <ProgressBar
          value={answers.length}
          max={tasks.length}
          size={44}
          thickness={3}
          color="var(--color-green)"
          trackColor="#e8e8e8"
          innerColor="var(--color-background)"
          label={tasks.length - answers.length}
        />
      </div>

      <div className={styles.exercise}>
        <div className={styles.answerPanel}>
          <div className={styles.panelHeading}>
            <label htmlFor="training-answer">Введіть переклад</label>

            <span className={styles.language}>
              <Icon
                name={isEnglishAnswer ? "united-kingdom-logo" : "ukraine-logo"}
                width={24}
                height={24}
              />
              {isEnglishAnswer ? "English" : "Ukrainian"}
            </span>
          </div>

          <textarea
            id="training-answer"
            className={styles.answerInput}
            value={translation}
            onChange={(event) => setTranslation(event.target.value)}
            placeholder="Enter translation"
          />

          {!isLastTask && (
            <button
              type="button"
              className={styles.nextButton}
              onClick={handleNext}
            >
              Next
              <Icon name="arrow-right" width={15} height={9} />
            </button>
          )}
        </div>

        <div className={styles.wordPanel}>
          <div className={styles.panelHeading}>
            <span className={styles.sourceWord}>{sourceWord}</span>

            <span className={styles.language}>
              <Icon
                name={isEnglishAnswer ? "ukraine-logo" : "united-kingdom-logo"}
                width={24}
                height={24}
              />
              {isEnglishAnswer ? "Ukrainian" : "English"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSave}
          disabled={submitAnswers.isPending}
        >
          {submitAnswers.isPending ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => router.push("/dictionary")}
        >
          Cancel
        </button>
      </div>

      {results && (
        <WellDoneModal
          results={results}
          onClose={() => router.replace("/dictionary")}
        />
      )}
    </section>
  );
}
