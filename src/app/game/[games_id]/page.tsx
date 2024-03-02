"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";

import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import Board from "@/components/Game/Board/Board";
import PlayersList from "@/components/Game/PlayersList/PlayersList";
import Footer from "@/components/Game/Footer/Footer";

import Loading from "@/components/Loading/Loading/Loading";

import { useRouter } from "next/navigation";
import System from "@/components/Game/System/System";

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

  const swap = useQuery(api.swaps.getByGames, {
    games_id: params.games_id,
  });

  const auction = useQuery(api.auctions.getByGames, {
    games_id: params.games_id,
  });

  const [openSwap, setOpenSwap] = useState(false);

  const router = useRouter();

  // console.log("players", players);
  // console.log("game", game);

  // useEffect, если победитель определен
  React.useEffect(() => {
    if (game && game.winner !== undefined) {
      router.push("/finish/" + params.games_id);
    }
  }, [game, params.games_id, router]);

  // useEffect, если игрок проиграл
  React.useEffect(() => {
    if (currentPlayer && currentPlayer.loser) {
      router.push("/");
    }
  }, [currentPlayer]);

  if (
    !cards ||
    !currentPlayer ||
    !players ||
    !game ||
    swap === undefined ||
    auction === undefined
  ) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <Board
        cards={cards}
        players={players}
        game={game}
        currentPlayer={currentPlayer}
        swap={swap}
        openSwap={openSwap}
        setOpenSwap={setOpenSwap}
        auction={auction}
      />
      <System game={game} players={players} />
      <PlayersList players={players} game={game} currentPlayer={currentPlayer} />
      <Footer
        currentPlayer={currentPlayer}
        game={game}
        swap={swap}
        setOpenSwap={setOpenSwap}
      />
    </div>
  );
}
