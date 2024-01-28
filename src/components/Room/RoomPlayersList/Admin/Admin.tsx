import { PlayersGetType } from "@/types/PlayersGetType";
import { Id } from "../../../../../convex/_generated/dataModel";
import styles from "./Admin.module.scss";
import { figuresList } from "@/constants/figures";
import { Crown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users"> | undefined;
  gameId: Id<"games"> | undefined;
};

export default function Admin({ players, adminId, gameId }: PropsType) {
  const removePlayer = useMutation(api.players.remove);
  const openGame = useMutation(api.games.open);

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

  return (
    <>
      <div className={styles.players}>
        {players.map((player) => {
          if (player.user?._id === adminId) {
            return (
              <div key={player.user?._id} className={styles.player}>
                <div
                  className={styles.figure}
                  style={
                    player.selected !== -1
                      ? {
                          backgroundColor: figuresList[player.selected].bg,
                        }
                      : {}
                  }
                >
                  <Crown
                    size={16}
                    color={
                      player.selected !== -1
                        ? figuresList[player.selected].color
                        : "#fff"
                    }
                  />
                </div>
                <Image
                  src={player.user?.picture!}
                  alt={"avatar"}
                  width={30}
                  height={30}
                  className={styles.avatar}
                />
                <span>{player.user?.name}</span>
                {/*для того, чтобы корзинки выстроились в ряд*/}
                <Trash2 size={20} color={"#fff"} opacity={0} />
              </div>
            );
          } else {
            return (
              <div key={player.user?._id} className={styles.player}>
                <div
                  className={styles.figure}
                  style={
                    player.selected !== -1
                      ? {
                          backgroundColor: figuresList[player.selected].bg,
                        }
                      : {}
                  }
                ></div>
                <Image
                  src={player.user?.picture!}
                  alt={"avatar"}
                  width={30}
                  height={30}
                  className={styles.avatar}
                />
                <span className={styles.playerName}>{player.user?.name}</span>
                <Trash2
                  size={20}
                  color={"#fff"}
                  cursor={"pointer"}
                  onClick={() => remove(player?._id)}
                />
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
      <div className={styles.start}>Начать игру</div>
    </>
  );
}
