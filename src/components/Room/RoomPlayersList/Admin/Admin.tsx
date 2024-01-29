import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import styles from "./Admin.module.scss";
import { Crown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import React, { useState } from "react";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users"> | undefined;
  game: Doc<"games">;
  gameId: Id<"games">;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Admin({
  players,
  adminId,
  gameId,
  setIsStarted,
}: PropsType) {
  const removePlayer = useMutation(api.players.remove);
  const openGame = useMutation(api.games.open);
  const startGame = useMutation(api.games.start);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function remove(playerId: Id<"players">) {
    await removePlayer({
      players_id: playerId,
    });
  }

  async function toggleRoom() {
    setIsOpen(!isOpen);
    await openGame({
      games_id: gameId!,
    });
  }

  async function start() {
    setIsStarted(true);
    await startGame({ games_id: gameId! });
  }

  return (
    <>
      <div className={styles.players}>
        {players.map((player) => {
          const figure = GetFigureFromSelected(player);
          if (player.user?._id === adminId) {
            return (
              <div key={player.user?._id} className={styles.player}>
                <div
                  className={styles.figure}
                  style={{
                    backgroundColor: figure.bg,
                  }}
                >
                  <Crown size={16} color={figure.color} />
                </div>
                <Image
                  src={player.user?.picture!}
                  alt={"avatar"}
                  width={30}
                  height={30}
                  className={styles.avatar}
                />
                <span className={styles.playerName}>{player.user?.name}</span>
              </div>
            );
          } else {
            return (
              <div key={player.user?._id} className={styles.player}>
                <div
                  className={styles.figure}
                  style={{
                    backgroundColor: figure.bg,
                  }}
                ></div>
                <Image
                  src={player.user?.picture!}
                  alt={"avatar"}
                  width={30}
                  height={30}
                  className={styles.avatar}
                />
                <span className={styles.playerName}>{player.user?.name}</span>
                <button className={styles.remove}>
                  <Trash2
                    size={20}
                    color={"#fff"}
                    cursor={"pointer"}
                    onClick={() => remove(player?._id)}
                  />
                </button>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.openWrapper}>
        <span>Открытая комната</span>
        <div
          className={styles.select}
          style={
            isOpen
              ? { backgroundColor: "#fff" }
              : { backgroundColor: "#a5a5a5" }
          }
          onClick={() => toggleRoom()}
        >
          <div
            className={
              isOpen
                ? styles.circle + " " + styles.open
                : styles.circle + " " + styles.close
            }
          ></div>
        </div>
      </div>
      <button className={styles.start} onClick={() => start()}>
        Начать игру
      </button>
    </>
  );
}
