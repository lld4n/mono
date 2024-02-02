"use client";
import React from "react";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Finish({ params }: { params: { games_id: Id<"games"> } }) {
  const removeGame = useAction(api.games.remove);
  const router = useRouter();
  React.useEffect(() => {
    toast.promise(removeGame({ games_id: params.games_id }), {
      loading: "Очищаем бд",
      success: () => {
        router.push("/");
        return "Очистка завершена";
      },
      error: (error) => error,
    });
  }, []);
  return (
    <div>
      Победитель на базе
      <Link href="/">На базу</Link>
    </div>
  );
}
