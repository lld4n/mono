import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getPlayerAdmin } from "@/utils/GetPlayerAdmin";
import { useEffect, useState } from "react";
import styles from "./RoomPlayersList.module.scss";
import Admin from "@/components/Room/RoomPlayersList/Admin/Admin";
import NoAdmin from "@/components/Room/RoomPlayersList/NoAdmin/NoAdmin";
import { useRouter } from "next/navigation";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
};

export default function RoomPlayersList({ players, game }: PropsType) {
  const userId = useQuery(api.users.identify);
  const [admin, setAdmin] = useState<PlayersGetType | undefined>();

  const [isStarted, setIsStarted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setAdmin(getPlayerAdmin(players, game));
  }, [admin, game, players]);

  useEffect(() => {
    if (game.started !== 0) router.push(`/game/${game._id}`);
  }, [game, router]);

  return (
    <div className={styles.wrapper}>
      {!isStarted && userId === admin?.user?._id ? (
        <Admin
          players={players}
          adminId={userId}
          gameId={game._id}
          setIsStarted={setIsStarted}
        ></Admin>
      ) : (
        <NoAdmin players={players} adminId={admin?.user?._id} />
      )}
    </div>
  );
}
