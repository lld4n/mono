import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { figuresList } from "@/constants/figures";
import { getPlayerAdmin } from "@/utils/GetPlayerAdmin";
import { useEffect, useState } from "react";
import styles from "./RoomPlayersList.module.scss";
import Admin from "@/components/Room/RoomPlayersList/Admin/Admin";
import NoAdmin from "@/components/Room/RoomPlayersList/NoAdmin/NoAdmin";
type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
};

export default function RoomPlayersList({ players, game }: PropsType) {
  const userId = useQuery(api.users.identify);
  const [admin, setAdmin] = useState<PlayersGetType | undefined>();
  useEffect(() => {
    const getAdmin = () => {
      setAdmin(getPlayerAdmin(players, game));
    };
    getAdmin();
  }, [admin, game, players]);

  return (
    <div className={styles.wrapper}>
      {userId === admin?.user?._id ? (
        <Admin players={players} adminId={userId} gameId={game._id}></Admin>
      ) : (
        <NoAdmin players={players} adminId={admin?.user?._id} />
      )}
    </div>
  );
}
