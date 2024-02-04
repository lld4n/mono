import React from "react";
import styles from "./Jail.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import Money from "@/components/Game/Money/Money";

export default function Jail({
  onPayJail,
  onTry,
  currentPlayer,
}: {
  onPayJail: () => void;
  onTry: () => void;
  currentPlayer: Doc<"players">;
}) {
  return (
    <div className={styles.wrapper}>
      {currentPlayer.tries < 3 && <MiniButton onClick={onTry}>Выбить дубль</MiniButton>}
      <MiniButton onClick={onPayJail}>
        Заплатить <Money value={500} />
      </MiniButton>
    </div>
  );
}
