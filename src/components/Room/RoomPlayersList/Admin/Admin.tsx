import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import styles from "./Admin.module.scss";
import { Crown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import React, { useState } from "react";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import IconButton from "@/components/Global/IconButton/IconButton";
import { toast } from "sonner";
import Button from "@/components/Global/Button/Button";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users">;
  game: Doc<"games">;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Admin({
  players,
  adminId,
  game,
  setIsStarted,
}: PropsType) {
  const removePlayer = useMutation(api.players.remove);
  const openGame = useMutation(api.games.open);
  const startGame = useMutation(api.games.start);

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
                    toast.promise(
                      removePlayer({
                        players_id: player?._id,
                      }),
                      {
                        loading: "Удаляем игрока",
                        success: "Игрок удален",
                        error: (error) => error,
                      },
                    );
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
          style={
            isOpen
              ? { backgroundColor: "#fff" }
              : { backgroundColor: "#a5a5a5" }
          }
          onClick={() => {
            setIsOpen(!isOpen);
            toast.promise(
              openGame({
                games_id: game._id,
              }),
              {
                loading: isOpen ? "Закрываем комнату" : "Открываем комнату",
                success: isOpen ? "Комната закрыта" : "Комната открыта",
                error: (error) => error,
              },
            );
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
          if (
            players.every((pl) => pl.selected !== -1) &&
            game.players_count > 1
          ) {
            setIsStarted(true);
            toast.promise(startGame({ games_id: game._id }), {
              loading: "Запускаем игру",
              success: "Игра запущена",
              error: (error) => error,
            });
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
