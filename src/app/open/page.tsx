"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Loading from "@/components/Loading/Loading";
import styles from "./page.module.scss";
import OpenBlock from "@/components/OpenBlock/OpenBlock";
export default function Open() {
  const games = useQuery(api.games.getOpen);
  if (!games) {
    return <Loading />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {games.map((game) => {
          return <OpenBlock game={game} key={game._id} />;
        })}
      </div>
    </div>
  );
}
