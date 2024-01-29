import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import GameFooter from "@/components/Game/GameFooter/GameFooter";
import GamePlayersList from "@/components/Game/GamePlayersList/GamePlayersList";
import GameBoard from "@/components/Game/GameBoard/GameBoard";
import styles from "./Wrapper.module.scss";

export default function Wrapper({ game_id }: { game_id: Id<"games"> }) {
  const game = useQuery(api.games.get, {
    games_id: game_id,
  });
  const players = useQuery(api.players.getAllByGames, {
    games_id: game_id,
  });

  const currentPlayer = useQuery(api.players.getByGames, {
    games_id: game_id,
  });

  const cards = useQuery(api.cards.getByGames, {
    games_id: game_id,
  });
  return (
    <div className={styles.wrapper}>
      <GameBoard
        cards={cards!}
        players={players!}
        game={game!}
        currentPlayer={currentPlayer!}
      />
      <GamePlayersList players={players!} game={game!} />
      <GameFooter currentPlayer={currentPlayer} game={game} />
    </div>
  );
}
