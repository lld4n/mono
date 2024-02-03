import React from "react";
import styles from "./MiniLoading.module.scss";
import { Loader2 } from "lucide-react";

export default function MiniLoading() {
  return <Loader2 size={20} color={"#ffffff"} className={styles.loader} />;
}
