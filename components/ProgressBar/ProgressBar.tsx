import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
  innerColor?: string;
  label?: string | number;
}

export function ProgressBar({
  value,
  max = 100,
  size = 20,
  thickness = 2,
  color = "#3cbf61",
  trackColor = "#d4f8d3",
  innerColor = "#ffffff",
  label,
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div
      className={styles.progress}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${percent}%, ${trackColor} 0)`,
      }}
    >
      <span
        className={styles.inner}
        style={{
          width: size - thickness * 2,
          height: size - thickness * 2,
          background: innerColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}
