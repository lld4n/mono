"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import Loading from "@/components/Global/Loading/Loading";

export default function Room() {
  const router = useRouter();
  const createGame = useMutation(api.games.create);
  useEffect(() => {
    createGame().then((gameId) => {
      router.push(`/room/${gameId}`);
    });
  }, [createGame, router]);
  return <Loading />;
}
