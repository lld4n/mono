"use client";
import { Id } from "../../../../convex/_generated/dataModel";
import { useConvexAuth } from "convex/react";
import Wrapper from "@/components/Game/Wrapper/Wrapper";
import { useEffect, useState } from "react";
import Loading from "@/components/Global/Loading/Loading";

export default function Game({
  params,
}: {
  params: { games_id: Id<"games"> };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useConvexAuth();
  useEffect(() => {
    if (isAuthenticated) setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <>{!isLoading ? <Wrapper game_id={params.games_id} /> : <Loading />}</>
  );
}
