import Image from "next/image";
import Link from "next/link";
import styles from "./TrainingEmpty.module.css";

export function TrainingEmpty() {
  return (
    <section className={styles.empty}>
      <div className={styles.illustration}>
        <Image
          src="/images/blood-report@2x.png"
          alt="Vocabulary learning illustration"
          width={265}
          height={282}
          priority
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          You don&apos;t have a single word to learn right now.
        </h1>

        <p className={styles.description}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>

        <div className={styles.buttons}>
          <Link href="/dictionary?add=true" className={styles.primaryButton}>
            Add word
          </Link>

          <Link href="/dictionary" className={styles.secondaryButton}>
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}
