"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import Loading from "@/components/Global/Loading/Loading";

export default function Room() {
  const router = useRouter();
  const createGame = useMutation(api.games.create);
  const sendTech = useMutation(api.messages.sendTech);
  useEffect(() => {
    createGame().then((gameId) => {
      sendTech({
        games_id: gameId,
        message: "Была создана комната",
      }).then(() => {
        router.push(`/room/${gameId}`);
      });
    });
  }, [createGame, router, sendTech]);
  return <Loading />;
}
