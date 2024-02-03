"use client";

import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./RenderFigures.module.scss";
import { useEffect, useState } from "react";
import { figuresList } from "@/constants/figures";
import Image from "next/image";
import { getCoordinates } from "@/utils/GetCoordinates";

type CoordinatesType = {
  left: number;
  top: number;
};
export default function RenderFigures({ players }: { players: PlayersGetType[] }) {
  const [coordinates, setCoordinates] = useState<CoordinatesType[]>([
    ...new Array(players.filter((player) => !player.loser).length).fill({
      left: 0,
      top: 0,
    }),
  ]);

  useEffect(() => {
    setTimeout(() => {
      setCoordinates(
        players
          .filter((player) => !player.loser)
          .map((player, index) => {
            const count = players
              .filter((player) => !player.loser)
              .reduce((accum, item) => {
                if (player.position === item.position) accum++;
                return accum;
              }, 0);
            const playersInCurrentPosition = players
              .filter((player) => !player.loser)
              .filter((item) => item.position === player.position)
              .map((_, index) => index);
            return getCoordinates(player.position, count, playersInCurrentPosition);
          }),
      );
    }, 100);
  }, [players]);

  return (
    <div className={styles.wrapper}>
      {players
        .filter((player) => !player.loser)
        .map((player, index) => {
          const count = players
            .filter((player) => !player.loser)
            .reduce((accum, item) => {
              if (player.position === item.position) accum++;
              return accum;
            }, 0);
          const playersInCurrentPosition = players
            .filter((player) => !player.loser)
            .filter((item) => item.position === player.position)
            .map((_, index) => index);
          let currentCoordinates = getCoordinates(
            player.position,
            count,
            playersInCurrentPosition,
          );
          let prevCoordinates = coordinates[index];
          let bufferCoordinates;
          if (
            Math.abs(currentCoordinates.top - prevCoordinates.top) > 50 &&
            Math.abs(currentCoordinates.left - prevCoordinates.left) > 50
          ) {
            if (player.position >= 11 && player.position <= 20) {
              bufferCoordinates = {
                top: 45,
                left: 755,
              };
            } else if (player.position > 20 && player.position <= 30) {
              bufferCoordinates = {
                top: 755,
                left: 755,
              };
            } else if (player.position > 30 && player.position <= 39) {
              bufferCoordinates = {
                top: 755,
                left: 45,
              };
            } else {
              bufferCoordinates = {
                top: 45,
                left: 45,
              };
            }
            return (
              <Image
                key={player._id}
                src={figuresList[player.selected].svg}
                alt={"figure"}
                style={{
                  position: "absolute",
                  top: bufferCoordinates.top,
                  left: bufferCoordinates.left,
                  transition: "0.1s all",
                }}
              />
            );
          }
          return (
            <Image
              key={player._id}
              src={figuresList[player.selected].svg}
              alt={"figure"}
              style={{
                position: "absolute",
                top: coordinates[index].top,
                left: coordinates[index].left,
                transition: "0.1s all",
              }}
            />
          );
        })}
    </div>
  );
}
