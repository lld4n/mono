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

export default function Game({
  params,
}: {
  params: { games_id: Id<"games"> };
}) {
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
      <GamePlayersList players={players} game={game} />
      <GameFooter currentPlayer={currentPlayer} game={game} />
    </div>
  );
}
