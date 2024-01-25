"use client";
import React from "react";
import styles from "./Copy.module.scss";
import { Copy } from "lucide-react";
export default function CopyComponent({ value }: { value: string }) {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setClicked(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
          setClicked(false);
        }, 1000);
      }}
    >
      <div
        className={clicked ? styles.value + " " + styles.anim : styles.value}
      >
        {value}
      </div>
      <Copy size={20} color="#ffffff" />
    </div>
  );
}
