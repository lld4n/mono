import React from "react";
import { PlayersGetType } from "@/utils/PlayersGetType";
import { Id } from "../../../convex/_generated/dataModel";
import { figuresList } from "@/constants/figures";
import styles from "./RoomFigureSelect.module.scss";

import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type PropsType = {
  players: PlayersGetType[];
  games_id: Id<"games">;
  players_id: Id<"players">;
};

export default function RoomFigureSelect({
  players,
  games_id,
  players_id,
}: PropsType) {
  const mutation = useMutation(api.players.select);
  async function select(figureIndex: number, isSelected: boolean) {
    if (!isSelected) {
      await mutation({ players_id, games_id, selected: figureIndex });
    }
  }

  return (
    <div>
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
              onClick={() => select(figure.index, isSelected)}
            >
              <Image src={figure.svg} alt={"figure"} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
