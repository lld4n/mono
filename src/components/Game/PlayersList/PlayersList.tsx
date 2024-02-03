import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./PlayersList.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import PlayerTimer from "@/components/Game/PlayerTimer/PlayerTimer";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
  currentPlayer: Doc<"players">;
};
export default function PlayersList({ players, game }: PropsType) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.players}>
        {players.map((player) => {
          const figure = GetFigureFromSelected(player);
          if (player.loser) {
            return (
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
            );
          }
          return (
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
              {player._id === game.current && <PlayerTimer timer={game.timer} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
