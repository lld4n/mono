import styles from "./Authors.module.scss";

export default function Authors() {
  return (
    <div className={styles.wrapper}>
      created by{" "}
      <a href="https://lldan.ru" className={styles.link}>
        lldan
      </a>{" "}
      &{" "}
      <a href="https://itrostik.ru/" className={styles.link}>
        itrostik
      </a>
    </div>
  );
}
