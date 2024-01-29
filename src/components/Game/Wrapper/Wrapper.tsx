import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Footer from "@/components/Game/Footer/Footer";
import GamePlayersList from "@/components/Game/GamePlayersList/GamePlayersList";

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
    <div>
      <GamePlayersList players={players!} game={game!} />
      <Footer currentPlayer={currentPlayer} game={game} />
    </div>
  );
}
