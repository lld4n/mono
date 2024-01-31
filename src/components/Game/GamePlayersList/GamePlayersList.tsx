"use client";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./GamePlayersList.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import PlayerTimer from "@/components/Game/PlayerTimer/PlayerTimer";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
  currentPlayer: Doc<"players">;
};
export default function GamePlayersList({
  players,
  game,
  currentPlayer,
}: PropsType) {
  const lose = useMutation(api.players.lose);
  return (
    <div className={styles.wrapper}>
      <div className={styles.players}>
        {players.map((player, i) => {
          const figure = GetFigureFromSelected(player);
          return (
            <>
              {!player.loser ? (
                <div
                  key={player._id}
                  className={
                    player._id === game.current
                      ? styles.player + " " + styles.active
                      : styles.player
                  }
                >
                  <Image
                    src={player.user?.picture!}
                    alt={"avatar"}
                    width={30}
                    height={30}
                    className={styles.avatar}
                  />
                  <span
                    className={styles.playerName}
                    style={{
                      backgroundColor: figure.bg,
                      color: figure.color,
                    }}
                  >
                    {player.user?.name}
                  </span>
                  <div className={styles.balance}>
                    <Money value={player.balance} />
                  </div>
                  {player._id === game.current && (
                    <PlayerTimer
                      game={game}
                      onFinish={() => {
                        if (currentPlayer._id === game.current) {
                          lose({
                            players_id: game.current,
                          });
                        }
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className={styles.player} key={player._id}>
                  <Image
                    src={player.user?.picture!}
                    alt={"avatar"}
                    width={30}
                    height={30}
                    className={styles.avatar}
                  />
                  <span className={styles.playerName}>{player.user?.name}</span>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
