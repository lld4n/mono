import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getPlayerAdmin } from "@/utils/GetPlayerAdmin";
import { useEffect, useState } from "react";
import styles from "./RoomPlayersList.module.scss";
import Admin from "@/components/Room/RoomPlayersList/Admin/Admin";
import NoAdmin from "@/components/Room/RoomPlayersList/NoAdmin/NoAdmin";
import MiniLoading from "@/components/Global/MiniLoading/MiniLoading";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
};

export default function RoomPlayersList({ players, game }: PropsType) {
  const userId = useQuery(api.users.identify);
  const [admin, setAdmin] = useState<PlayersGetType | undefined>();
  const [isStarted, setIsStarted] = useState<boolean>(false);

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
      {!isStarted && userId === admin.user!._id ? (
        <Admin
          game={game}
          players={players}
          adminId={userId}
          setIsStarted={setIsStarted}
        ></Admin>
      ) : (
        <NoAdmin players={players} adminId={admin.user!._id} game={game} />
      )}
      <button className={styles.delete}>
        {admin.user!._id === userId ? "Удалить" : "Покинуть"} игру
      </button>
    </div>
  );
}
