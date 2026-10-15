import { Header } from "@/components/Header/Header";
import styles from "./layout.module.css";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
