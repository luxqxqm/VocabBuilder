type IconName =
  | "logo"
  | "united-kingdom-logo"
  | "ukraine-logo"
  | "trash-icon"
  | "search"
  | "plus"
  | "eye"
  | "eye-off"
  | "edit-icon"
  | "arrows"
  | "arrow-right"
  | "arrow-down";

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
}

export function Icon({ name, width = 20, height = 20 }: IconProps) {
  return (
    <svg width={width} height={height} aria-hidden="true">
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
