import { Doc } from "../../../../convex/_generated/dataModel";
import styles from "./Footer.module.scss";
import Money from "@/components/Game/Money/Money";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Timer from "@/components/Game/Timer/Timer";

type PropsType = {
  currentPlayer: Doc<"players"> | undefined | null;
  game: Doc<"games"> | undefined;
};

export default function Footer({ currentPlayer, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {game && (
          <div className={styles.leftItem}>
            <Timer time={game?.started} />
          </div>
        )}
        <div className={styles.leftItem}>
          <Money value={currentPlayer?.balance} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.item}>Обмен</div>
        <div className={styles.item}>Покинуть игру</div>
      </div>
    </div>
  );
}
