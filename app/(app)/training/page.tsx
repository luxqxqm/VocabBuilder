import type { Metadata } from "next";
import { TrainingView } from "@/components/TrainingRoom/TrainingView";

export const metadata: Metadata = { title: "Training" };

export default function TrainingPage() {
  return <TrainingView />;
}
