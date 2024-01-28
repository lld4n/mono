"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import Loading from "@/components/Global/Loading/Loading";

export default function Room() {
  const router = useRouter();
  const mutation = useMutation(api.games.create);
  useEffect(() => {
    const createGame = async () => {
      const gameId = await mutation();
      router.push(`/room/${gameId}`);
    };
    createGame();
  }, []);
  return <Loading />;
}
