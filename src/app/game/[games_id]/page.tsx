import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

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

  return <div></div>;
}
