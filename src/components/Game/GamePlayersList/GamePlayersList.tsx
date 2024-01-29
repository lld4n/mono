import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./GamePlayersList.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import { XSquare } from "lucide-react";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
};
export default function GamePlayersList({ players, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.players}>
        {players &&
          players.map((player) => {
            const figure = GetFigureFromSelected(player);
            return (
              <>
                {!player.loser ? (
                  <div
                    key={player.user?._id}
                    className={
                      player.order === game.current
                        ? styles.player + " " + styles.active
                        : styles.player
                    }
                  >
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
                    <span className={styles.playerName}>
                      {player.user?.name}
                    </span>
                    <div className={styles.balance}>
                      <Money value={player.balance} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.player}>
                    <Image
                      src={player.user?.picture!}
                      alt={"avatar"}
                      width={30}
                      height={30}
                      className={styles.avatar}
                    />
                    <span className={styles.playerName}>
                      {player.user?.name}
                    </span>
                    <XSquare size={16} color={"#fff"} />
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
