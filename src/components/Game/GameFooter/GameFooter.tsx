import { Doc } from "../../../../convex/_generated/dataModel";
import styles from "./GameFooter.module.scss";
import Money from "@/components/Game/Money/Money";
import Timer from "@/components/Game/Timer/Timer";

type PropsType = {
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
};

export default function GameFooter({ currentPlayer, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={styles.leftItem}>
          <Timer time={game.started} />
        </div>
        <div className={styles.leftItem}>
          <Money value={currentPlayer.balance} />
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.item}>Обмен</div>
        <div className={styles.delete}>Покинуть игру</div>
      </div>
    </div>
  );
}
