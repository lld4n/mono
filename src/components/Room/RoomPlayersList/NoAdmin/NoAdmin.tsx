import { PlayersGetType } from "@/types/PlayersGetType";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Crown } from "lucide-react";
import Image from "next/image";
import styles from "./NoAdmin.module.scss";
import { figuresList } from "@/constants/figures";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";

type PropsType = {
  players: PlayersGetType[];
  adminId: Id<"users"> | undefined;
};

export default function NoAdmin({ players, adminId }: PropsType) {
  return (
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
              <span>{player.user?.name}</span>
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
            </div>
          );
        }
      })}
    </div>
  );
}
