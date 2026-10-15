"use client";

import { getErrorMessage } from "@/lib/api";
import { useTasks } from "@/lib/queries";
import { TrainingEmpty } from "../TrainingEmpty/TrainingEmpty";
import { TrainingRoom } from "./TrainingRoom";
import styles from "./TrainingRoom.module.css";

export function TrainingView() {
  const tasks = useTasks();

  if (tasks.isPending) {
    return <p className={styles.status}>Loading training...</p>;
  }

  if (tasks.isError) {
    return <p className={styles.status}>{getErrorMessage(tasks.error)}</p>;
  }

  if (tasks.data.length === 0) {
    return <TrainingEmpty />;
  }

  return <TrainingRoom tasks={tasks.data} />;
}
