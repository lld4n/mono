"use client";

import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./RenderFigures.module.scss";
import { useEffect, useState } from "react";
import { figuresList } from "@/constants/figures";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { getCoordinates } from "@/utils/GetCoordinates";
import { Id } from "../../../../convex/_generated/dataModel";

type CoordinatesType = {
  left: number;
  top: number;
};
export default function RenderFigures({
  players,
  gameId,
}: {
  players: PlayersGetType[];
  gameId: Id<"games">;
}) {
  const [coordinates, setCoordinates] = useState<CoordinatesType[]>([
    ...new Array(players.filter((player) => !player.loser).length).fill({
      left: 0,
      top: 0,
    }),
  ]);

  const currentPlayer = useQuery(api.players.getByGames, {
    games_id: gameId,
  });

  useEffect(() => {
    setTimeout(() => {
      setCoordinates(
        players.map((player, index) => {
          const count = players.reduce((accum, item) => {
            if (player.position === item.position) accum++;
            return accum;
          }, 0);
          const playersInCurrentPosition = players
            .filter((item) => item.position === player.position)
            .map((_, index) => index);
          return getCoordinates(player.position, count, playersInCurrentPosition);
        }),
      );
    }, 1000);
  }, [players]);

  return (
    <div className={styles.wrapper}>
      {players.map((player, index) => {
        if (!player.loser) {
          const count = players.reduce((accum, item) => {
            if (player.position === item.position) accum++;
            return accum;
          }, 0);
          const playersInCurrentPosition = players
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
                  transition: "0.5s all",
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
                transition: "0.5s all",
              }}
            />
          );
        }
      })}
    </div>
  );
}
