import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { Crown } from "lucide-react";
import Image from "next/image";
import styles from "./NoAdmin.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users"> | undefined;
  game: Doc<"games">;
};

export default function NoAdmin({ players, adminId, game }: PropsType) {
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
                ></div>
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
          }
        })}
      </div>
      <div className={styles.open}>
        {game.open ? "Комната открыта" : "Комната закрыта"}
      </div>
    </>
  );
}
