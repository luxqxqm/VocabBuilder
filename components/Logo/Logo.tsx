import Link from "next/link";
import { Icon } from "../Icon/Icon";
import styles from "./Logo.module.css";

export function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className={styles.logo}>
      <Icon name="logo" width={40} height={40} />
      <span>VocabBuilder</span>
    </Link>
  );
}
