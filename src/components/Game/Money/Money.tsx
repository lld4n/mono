import React from "react";
import styles from "./Money.module.scss";
export default function Money({ value }: { value: number }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.value}>{value}</span>
      <span className={styles.currency}>✦</span>
    </div>
  );
}
