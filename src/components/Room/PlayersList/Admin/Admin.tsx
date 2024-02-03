import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import styles from "./Admin.module.scss";
import { Crown, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import Button from "@/components/Buttons/Button/Button";
import { usePlayers } from "@/hooks/usePlayers";
import { useGames } from "@/hooks/useGames";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users">;
  game: Doc<"games">;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Admin({ players, adminId, game, setIsStarted }: PropsType) {
  const { toastRemove } = usePlayers();
  const { toastOpen, toastStart } = useGames();

  const [isOpen, setIsOpen] = useState<boolean>(game.open);

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
                <div className={styles.playerName}>{player.user?.name}</div>
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
                />
                <Image
                  src={player.user?.picture!}
                  alt={"avatar"}
                  width={30}
                  height={30}
                  className={styles.avatar}
                />
                <span className={styles.playerName}>{player.user?.name}</span>
                <IconButton
                  danger
                  onClick={() => {
                    toastRemove(player?._id);
                  }}
                >
                  <Trash2 size={20} color="#fff" />
                </IconButton>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.openWrapper}>
        <span>Открытая комната</span>
        <div
          className={styles.select}
          style={isOpen ? { backgroundColor: "#fff" } : { backgroundColor: "#a5a5a5" }}
          onClick={() => {
            toastOpen(game._id, isOpen);
            setIsOpen(!isOpen);
          }}
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
      <Button
        onClick={() => {
          if (players.every((pl) => pl.selected !== -1) && game.players_count > 1) {
            setIsStarted(true);
            toastStart(game._id);
          }
        }}
        disabled={
          !players.every((pl) => pl.selected !== -1) || game.players_count === 1
        }
      >
        Начать игру
      </Button>
    </>
  );
}
