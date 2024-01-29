import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { figuresList } from "@/constants/figures";
import styles from "./GamePlayersList.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import { Crown } from "lucide-react";
import Image from "next/image";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
};
export default function GamePlayersList({ players, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      {players &&
        players.map((player) => {
          const figure = GetFigureFromSelected(player);
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
        })}
    </div>
  );
}
