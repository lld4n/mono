import React from "react";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Id } from "../../../../convex/_generated/dataModel";
import { figuresList } from "@/constants/figures";
import styles from "./FigureSelect.module.scss";

import Image from "next/image";
import { usePlayers } from "@/hooks/usePlayers";

type PropsType = {
  players: PlayersGetType[];
  games_id: Id<"games">;
  players_id: Id<"players">;
};

export default function FigureSelect({ players, games_id, players_id }: PropsType) {
  const { toastSelect } = usePlayers();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Выберите персонажа</h3>
      <div className={styles.figureList}>
        {figuresList.map((figure) => {
          let isSelected = false;
          players.forEach((player) => {
            if (player.selected === figure.index) {
              isSelected = true;
              return;
            }
          });
          return (
            <button
              key={figure.index}
              className={isSelected ? styles.disabled : styles.active}
              onClick={() => {
                if (!isSelected) {
                  toastSelect(players_id, games_id, figure.index);
                }
              }}
            >
              <Image src={figure.svg} alt={String(figure.index)} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
