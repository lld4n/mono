import React from "react";
import styles from "./Buy.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";
import Money from "@/components/Game/Money/Money";

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
        <button
          className={styles.btn}
          disabled={currentPlayer.balance < money}
          onClick={() => {
            if (currentPlayer.balance >= money) {
              onBuy(money);
            }
          }}
        >
          Купить за <Money value={money} />
        </button>
      )}
      <button className={styles.btn} onClick={onAuction}>
        Выставить на аукцион
      </button>
    </div>
  );
}
