import { Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import styles from "./System.module.scss";
import { ArrowLeftFromLine } from "lucide-react";
import { useState } from "react";
import { figuresList } from "@/constants/figures";
import { ReformatDate } from "@/utils/ReformatDate";
import { PlayersGetType } from "@/types/PlayersGetType";
import IconButton from "@/components/Buttons/IconButton/IconButton";

type PropsType = {
  game: Doc<"games">;
  players: PlayersGetType[];
};
export default function System({ game, players }: PropsType) {
  const messages = useQuery(api.system.getByGames, {
    games_id: game._id,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <IconButton className={!isOpen ? styles.arrow : styles.openArrow} onClick={open}>
        <ArrowLeftFromLine size={20} color="#ffffff" />
      </IconButton>
      <div className={!isOpen ? styles.wrapper : styles.openWrapper}>
        {messages?.map((message) => {
          return (
            <div key={message._id} className={styles.info}>
              <div className={styles.infoTop}>
                {players.map((player) => {
                  if (player._id === message.players) {
                    return (
                      <div
                        className={styles.figure}
                        style={{
                          backgroundColor: figuresList[player.selected].bg,
                          width: 40,
                          height: 10,
                        }}
                        key={player._id}
                      ></div>
                    );
                  }
                })}
                {message.money && <span className={styles.money}>{message.money}</span>}
                <span>{ReformatDate(message._creationTime)}</span>
              </div>
              <div className={styles.infoBottom}>{message.message}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
