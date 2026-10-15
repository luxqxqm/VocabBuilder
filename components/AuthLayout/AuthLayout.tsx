"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Logo } from "../Logo/Logo";
import styles from "./AuthLayout.module.css";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/dictionary");
    }
  }, [router]);

  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo href="/login" />
        </header>

        <main className={styles.main}>
          <div className={styles.formContainer}>{children}</div>

          <div className={styles.illustrationContainer}>
            <Image
              src="/images/illustration@2x.png"
              alt="Two students reading books"
              width={498}
              height={435}
              priority
              className={styles.illustration}
            />
          </div>

          <p className={styles.caption}>
            Word <span>·</span> Translation <span>·</span> Grammar{" "}
            <span>·</span> Progress
          </p>
        </main>
      </div>
    </div>
  );
}
