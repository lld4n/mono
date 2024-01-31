"use client";
import React from "react";
import styles from "./BuyComponent.module.scss";
import { Doc } from "../../../../convex/_generated/dataModel";
import Money from "@/components/Game/Money/Money";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function BuyComponent({
  onBuy,
  money,
  game,
  currentPlayer,
  generalBalance,
}: {
  onBuy: (money: number) => void;
  money: number;
  game: Doc<"games">;
  currentPlayer: Doc<"players">;
  generalBalance: number;
}) {
  const updateCurrent = useMutation(api.games.updateCurrent);
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
      <button
        className={styles.btn}
        onClick={() => {
          updateCurrent({
            games_id: game._id,
          });
        }}
      >
        Выставить на аукцион
      </button>
    </div>
  );
}
