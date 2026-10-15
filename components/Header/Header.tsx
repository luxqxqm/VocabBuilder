"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useUser } from "@/lib/queries";
import { Logo } from "../Logo/Logo";
import styles from "./Header.module.css";

const navigation = [
  { label: "Dictionary", href: "/dictionary" },
  { label: "Recommend", href: "/recommend" },
  { label: "Training", href: "/training" },
];

function UserAvatar({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`${styles.avatar} ${inverted ? styles.avatarInverted : ""}`}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 21a8 8 0 0 1 16 0" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isError } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [isError, router]);

  function handleLogout() {
    api.post("/users/signout").catch(() => {});
    localStorage.removeItem("token");
    queryClient.clear();
    router.replace("/login");
  }

  const userName = user?.name ?? "";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo href="/dictionary" />

        <nav className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.userArea}>
          <span className={styles.userName}>{userName}</span>
          <UserAvatar />

          <button
            type="button"
            className={styles.desktopLogout}
            onClick={handleLogout}
          >
            Log out
            <span aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.menuOverlay}>
          <button
            type="button"
            className={styles.backdrop}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />

          <aside className={styles.mobileMenu}>
            <div className={styles.menuTop}>
              <div className={styles.menuUser}>
                <span className={styles.menuUserName}>{userName}</span>
                <UserAvatar inverted />
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5 19 19M19 5 5 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className={styles.mobileNav}>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${
                    pathname === item.href ? styles.mobileActive : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                className={styles.mobileLogout}
                onClick={handleLogout}
              >
                Log out
                <span aria-hidden="true">→</span>
              </button>
            </nav>

            <div className={styles.menuIllustration}>
              <Image
                src="/images/illustration@2x.png"
                alt=""
                fill
                sizes="(max-width: 767px) 320px, 420px"
                className={styles.illustrationImage}
              />
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
