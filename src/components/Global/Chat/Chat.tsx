import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MiniLoading from "@/components/Global/MiniLoading/MiniLoading";
import { ReformatDate } from "@/utils/ReformatDate";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";
import { Send } from "lucide-react";
import styles from "./Chat.module.scss";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
export default function Chat({
  players,
  playerId,
  games_id,
}: {
  players: PlayersGetType[];
  playerId: Id<"players">;
  games_id: Id<"games">;
}) {
  const [value, setValue] = React.useState("");
  const messages = useQuery(api.messages.getByGames, {
    games_id: games_id,
  });
  const send = useMutation(api.messages.send);

  if (!messages) {
    return <MiniLoading />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {messages.map((message) => {
          let player;
          if (message.player) {
            player = GetPlayerFromId(players, message.player);
          }
          return (
            <div key={message._id} className={styles.message}>
              <span className={styles.date}>
                {ReformatDate(message._creationTime)}
              </span>
              {player && (
                <span
                  className={styles.player}
                  style={{
                    backgroundColor: GetFigureFromSelected(player).bg,
                    color: GetFigureFromSelected(player).color,
                  }}
                >
                  {player.user!.name}
                </span>
              )}
              <span className={styles.text}>{message.message}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите сообщение"
          className={styles.input}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (value.length > 0) {
                send({
                  games_id: games_id,
                  players_id: playerId,
                  message: value,
                });
                setValue("");
              }
            }
          }}
        />
        <button
          className={styles.btn}
          disabled={!value}
          onClick={() => {
            if (value.length > 0) {
              send({
                games_id: games_id,
                players_id: playerId,
                message: value,
              });
              setValue("");
            }
          }}
        >
          <Send size={20} color="#ffffff" />
        </button>
      </div>
    </div>
  );
}
