"use client";
import React from "react";
import styles from "./PayComponent.module.scss";
import { Doc } from "../../../../convex/_generated/dataModel";
import Money from "@/components/Game/Money/Money";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function PayComponent({
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
  const lose = useMutation(api.players.lose);
  return (
    <div className={styles.wrapper}>
      {generalBalance >= money && (
        <button
          className={styles.btn}
          disabled={currentPlayer.balance < money}
          onClick={() => {
            if (currentPlayer.balance >= money) {
              onPay(money);
            }
          }}
        >
          Заплатить <Money value={money} />
        </button>
      )}

      <button className={styles.lose} onClick={onLose}>
        Сдаться
      </button>
    </div>
  );
}
