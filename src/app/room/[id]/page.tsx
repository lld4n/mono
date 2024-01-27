"use client";
import RoomFigureSelect from "@/components/RoomFigureSelect/RoomFigureSelect";
import Copy from "@/components/Copy/Copy";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import styles from "./page.module.scss";

export default function Game({ params }: { params: { id: Id<"games"> } }) {
  const [playerId, setPlayerId] = useState<Id<"players">>();

  const players = useQuery(api.players.getAllByGames, {
    games_id: params.id,
  });

  // для теста
  useEffect(() => {
    console.log(players);
  }, [players]);

  const mutation = useMutation(api.players.add);
  useEffect(() => {
    const addPlayer = async () => {
      const playerId = await mutation({ games_id: params.id });
      setPlayerId(playerId);
    };
    addPlayer();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Copy value={params.id} />
      {players && playerId && (
        <RoomFigureSelect
          games_id={params.id}
          players_id={playerId}
          players={players}
        />
      )}
    </div>
  );
}
