import { Doc } from "../../../../convex/_generated/dataModel";
import styles from "./GameFooter.module.scss";
import Money from "@/components/Game/Money/Money";
import Timer from "@/components/Game/Timer/Timer";
import Image from "next/image";
import micro_logo from "@/assets/micro-logo.svg";
type PropsType = {
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
};

export default function GameFooter({ currentPlayer, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image src={micro_logo} alt="logo" className={styles.logo} />
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
