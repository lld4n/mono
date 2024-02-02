"use client";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import styles from "./page.module.scss";
import GameBoard from "@/components/Game/GameBoard/GameBoard";
import GamePlayersList from "@/components/Game/GamePlayersList/GamePlayersList";
import GameFooter from "@/components/Game/GameFooter/GameFooter";
import Loading from "@/components/Global/Loading/Loading";
import React from "react";
import { useRouter } from "next/navigation";

export default function Game({ params }: { params: { games_id: Id<"games"> } }) {
  const game = useQuery(api.games.get, {
    games_id: params.games_id,
  });
  const players = useQuery(api.players.getAllByGames, {
    games_id: params.games_id,
  });

  const currentPlayer = useQuery(api.players.getByGames, {
    games_id: params.games_id,
  });

  const cards = useQuery(api.cards.getByGames, {
    games_id: params.games_id,
  });
  const router = useRouter();

  console.log("players", players);
  console.log("game", game);

  // useEffect, если победитель определен
  React.useEffect(() => {
    if (game && game.winner !== undefined) {
      router.push("/finish/" + params.games_id);
    }
  }, [game]);

  if (!cards || !currentPlayer || !players || !game) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <GameBoard
        cards={cards}
        players={players}
        game={game}
        currentPlayer={currentPlayer}
      />
      <GamePlayersList players={players} game={game} currentPlayer={currentPlayer} />
      <GameFooter currentPlayer={currentPlayer} game={game} />
    </div>
  );
}
