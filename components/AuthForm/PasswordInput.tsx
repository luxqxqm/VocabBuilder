"use client";

import { useState } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./AuthForm.module.css";

type PasswordInputProps = React.ComponentProps<"input"> & { error?: string };

export function PasswordInput({ error, ...inputProps }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.field}>
      <div className={styles.passwordField}>
        <input
          className={styles.passwordInput}
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          aria-label="Password"
          {...inputProps}
        />

        <button
          type="button"
          className={styles.eyeButton}
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible(!isVisible)}
        >
          <Icon name={isVisible ? "eye" : "eye-off"} />
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
