"use client";
import FigureSelect from "@/components/Room/FigureSelect/FigureSelect";
import Copy from "@/components/Room/Copy/Copy";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import styles from "./page.module.scss";
import Loading from "@/components/Loading/Loading/Loading";
import Chat from "@/components/Chat/Chat";
import PlayersList from "@/components/Room/PlayersList/PlayersList";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Game({ params }: { params: { games_id: Id<"games"> } }) {
  const [playerId, setPlayerId] = useState<Id<"players">>();
  const players = useQuery(api.players.getAllByGames, {
    games_id: params.games_id,
  });

  const game = useQuery(api.games.get, {
    games_id: params.games_id,
  });

  const router = useRouter();

  const addPlayer = useMutation(api.players.add);
  useEffect(() => {
    toast.promise(addPlayer({ games_id: params.games_id }), {
      loading: "Добавляем игрока",
      success: (data) => {
        setPlayerId(data);
        return "Игрок добавлен";
      },
      error: (error) => error,
    });
  }, [addPlayer, params.games_id]);

  // useEffect, если игра удалилась и ее не получилось получить
  useEffect(() => {
    if (game === null) router.push("/");
  }, []);

  // useEffect, если игрока выгнали
  useEffect(() => {
    if (players && playerId && !players.map((pl) => pl._id).includes(playerId)) {
      router.push("/");
    }
  }, [playerId, players, router]);

  // useEffect, если игра началась
  useEffect(() => {
    if (game && game.started !== 0) router.push(`/game/${game._id}`);
  }, [game, router]);

  if (!game || !players || !playerId) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <Copy value={params.games_id} />
      <FigureSelect
        games_id={params.games_id}
        players_id={playerId}
        players={players}
      />
      <Chat players={players} playerId={playerId} games_id={params.games_id} />
      <PlayersList players={players} game={game} playerId={playerId} />
    </div>
  );
}
