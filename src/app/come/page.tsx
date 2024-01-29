"use client";
import React from "react";
import styles from "./page.module.scss";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Come() {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите ключ комнаты"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (value) {
              router.push("/room/" + value);
            }
          }
        }}
      />
      <button
        className={styles.btn}
        disabled={!value}
        onClick={() => {
          if (value) {
            router.push("/room/" + value);
          }
        }}
      >
        <BadgeCheck size={20} color="#ffffff" />
      </button>
    </div>
  );
}
