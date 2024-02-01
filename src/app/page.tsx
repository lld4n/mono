"use client";
import { useConvexAuth } from "convex/react";
import Secondary from "@/components/Home/Secondary/Secondary";
import Primary from "@/components/Home/Primary/Primary";
import Authors from "@/components/Home/Authors/Authors";
import styles from "./page.module.scss";
export default function Home() {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return (
      <div className={styles.wrapper}>
        <Primary />
        <Authors />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <Secondary />
      <Authors />
    </div>
  );
}
