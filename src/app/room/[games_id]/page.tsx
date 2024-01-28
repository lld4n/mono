"use client";
import RoomFigureSelect from "@/components/RoomFigureSelect/RoomFigureSelect";
import Copy from "@/components/Copy/Copy";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import styles from "./page.module.scss";
import Loading from "@/components/Loading/Loading";

export default function Game({
  params,
}: {
  params: { games_id: Id<"games"> };
}) {
  const [playerId, setPlayerId] = useState<Id<"players">>();

  const players = useQuery(api.players.getAllByGames, {
    games_id: params.games_id,
  });

  const game = useQuery(api.games.get, {
    games_id: params.games_id,
  });

  const addPlayer = useMutation(api.players.add);
  useEffect(() => {
    addPlayer({ games_id: params.games_id }).then((player_id) =>
      setPlayerId(player_id),
    );
  }, []);

  if (!game || !players) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <Copy value={params.games_id} />
      {players && playerId && (
        <RoomFigureSelect
          games_id={params.games_id}
          players_id={playerId}
          players={players}
        />
      )}
    </div>
  );
}
