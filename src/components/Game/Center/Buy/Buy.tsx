import React from "react";
import styles from "./Buy.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";
import Money from "@/components/Game/Money/Money";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";

export default function Buy({
  onBuy,
  money,
  currentPlayer,
  generalBalance,
  onAuction,
}: {
  onBuy: (money: number) => void;
  money: number;
  currentPlayer: Doc<"players">;
  generalBalance: number;
  onAuction: () => void;
}) {
  return (
    <div className={styles.wrapper}>
      {generalBalance >= money && (
        <MiniButton
          onClick={() => {
            if (currentPlayer.balance >= money) {
              onBuy(money);
            }
          }}
          disabled={currentPlayer.balance < money}
        >
          Купить за <Money value={money} />
        </MiniButton>
      )}
      <MiniButton onClick={onAuction}>Выставить на аукцион</MiniButton>
    </div>
  );
}
