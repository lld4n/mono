import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getPlayerAdmin } from "@/utils/GetPlayerAdmin";
import React, { useEffect, useState } from "react";
import styles from "./RoomPlayersList.module.scss";
import Admin from "@/components/Room/RoomPlayersList/Admin/Admin";
import NoAdmin from "@/components/Room/RoomPlayersList/NoAdmin/NoAdmin";
import MiniLoading from "@/components/Global/MiniLoading/MiniLoading";
import { toast } from "sonner";
import MiniButton from "@/components/Global/MiniButton/MiniButton";
import { useRouter } from "next/navigation";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
  playerId: Id<"players">;
};

export default function RoomPlayersList({
  players,
  game,
  playerId,
}: PropsType) {
  const userId = useQuery(api.users.identify);
  const leaveGame = useMutation(api.players.remove);
  const delGame = useAction(api.games.remove);

  const [admin, setAdmin] = useState<PlayersGetType | undefined>();
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setAdmin(getPlayerAdmin(players, game));
  }, [admin, game, players]);

  if (!admin || !userId) {
    return (
      <div className={styles.wrapper}>
        <MiniLoading />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {!isStarted && userId === admin.user?._id ? (
        <Admin
          game={game}
          players={players}
          adminId={userId}
          setIsStarted={setIsStarted}
        />
      ) : (
        <NoAdmin players={players} adminId={admin.user?._id} game={game} />
      )}
      {!isStarted && (
        <MiniButton
          danger
          className={styles.delete}
          onClick={() => {
            if (userId === admin.user?._id) {
              toast.promise(delGame({ games_id: game._id }), {
                loading: "Удаляем игру",
                success: () => {
                  router.push("/");
                  return "Игра удалена";
                },
                error: (error) => error,
              });
            } else {
              toast.promise(leaveGame({ players_id: playerId }), {
                loading: "Покидаем игру",
                success: () => {
                  router.push("/");
                  return "Игра покинута";
                },
                error: (error) => error,
              });
            }
          }}
        >
          {admin.user?._id === userId ? "Удалить" : "Покинуть"} игру
        </MiniButton>
      )}
    </div>
  );
}
