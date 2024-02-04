import React from "react";
import styles from "./Pay.module.scss";
import { Doc } from "../../../../../convex/_generated/dataModel";
import Money from "@/components/Game/Money/Money";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";

export default function Pay({
  onPay,
  money,
  currentPlayer,
  generalBalance,
  onLose,
}: {
  onPay: (money: number) => void;
  money: number;
  currentPlayer: Doc<"players">;
  generalBalance: number;
  onLose: () => void;
}) {
  return (
    <div className={styles.wrapper}>
      {generalBalance >= money && (
        <MiniButton
          disabled={currentPlayer.balance < money}
          onClick={() => {
            if (currentPlayer.balance >= money) {
              onPay(money);
            }
          }}
        >
          Заплатить <Money value={money} />
        </MiniButton>
      )}

      <MiniButton danger onClick={onLose}>
        Сдаться
      </MiniButton>
    </div>
  );
}
