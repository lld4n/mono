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
import { getPosition } from "@/utils/GetPosition";

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

  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCoordinates(
        players.map((player) => {
          return getCoordinates(player.position);
        }),
      );
    }, 600);
  }, [players]);

  function move() {
    if (isMoved) {
    }
  }

  return (
    <div className={styles.wrapper}>
      {players.map((player, index) => {
        if (!player.loser) {
          let currentCoordinates = getCoordinates(player.position);
          let prevCoordinates = coordinates[index];
          let bufferCoordinates;
          if (
            currentCoordinates.top !== prevCoordinates.top &&
            currentCoordinates.left !== prevCoordinates.left
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
          } else if (Math.abs(player.position - getPosition(prevCoordinates)) > 10) {
            //здесь пока что хуйня написана, не работает
            // if (player.position === 11) {
            //   bufferCoordinates = {
            //     top: 45,
            //     left: 45,
            //   };
            //   return (
            //     <Image
            //       key={player._id}
            //       src={figuresList[player.selected].svg}
            //       alt={"figure"}
            //       style={{
            //         position: "absolute",
            //         top: bufferCoordinates.top,
            //         left: bufferCoordinates.left,
            //         transition: "0.5s all",
            //       }}
            //       className={styles.frame1}
            //     />
            //   );
            // } else if (player.position === 21) {
            //   bufferCoordinates = {
            //     top: 45,
            //     left: 755,
            //   };
            //   return (
            //     <Image
            //       key={player._id}
            //       src={figuresList[player.selected].svg}
            //       alt={"figure"}
            //       style={{
            //         position: "absolute",
            //         top: bufferCoordinates.top,
            //         left: bufferCoordinates.left,
            //         transition: "0.5s all",
            //       }}
            //       className={styles.frame2}
            //     />
            //   );
            // } else if (player.position === 31) {
            //   bufferCoordinates = {
            //     top: 755,
            //     left: 755,
            //   };
            //   return (
            //     <Image
            //       key={player._id}
            //       src={figuresList[player.selected].svg}
            //       alt={"figure"}
            //       style={{
            //         position: "absolute",
            //         top: bufferCoordinates.top,
            //         left: bufferCoordinates.left,
            //         transition: "0.5s all",
            //       }}
            //       className={styles.frame3}
            //     />
            //   );
            // } else {
            //   bufferCoordinates = {
            //     top: 755,
            //     left: 45,
            //   };
            //   return (
            //     <Image
            //       key={player._id}
            //       src={figuresList[player.selected].svg}
            //       alt={"figure"}
            //       style={{
            //         position: "absolute",
            //         top: bufferCoordinates.top,
            //         left: bufferCoordinates.left,
            //         transition: "0.5s all",
            //       }}
            //       className={styles.frame4}
            //     />
            //   );
            // }
          }
          return (
            <Image
              key={player._id}
              src={figuresList[player.selected].svg}
              alt={"figure"}
              style={{
                position: "absolute",
                top: currentCoordinates.top,
                left: currentCoordinates.left,
                transition: "0.5s all",
              }}
            />
          );
        }
      })}
    </div>
  );
}
