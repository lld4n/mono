import { Doc } from "../../../../convex/_generated/dataModel";
import styles from "./Footer.module.scss";
import Money from "@/components/Game/Money/Money";
import Image from "next/image";
import micro_logo from "@/assets/micro-logo.svg";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GetTimeGame } from "@/utils/GetTimeGame";

type PropsType = {
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
  swap: Doc<"swaps"> | null;
  setOpenSwap: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Footer({ currentPlayer, game, swap, setOpenSwap }: PropsType) {
  const [currentTime, setCurrentTime] = useState<string>(GetTimeGame(game.started));
  const lose = useMutation(api.players.lose);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(GetTimeGame(game.started));
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [game]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image src={micro_logo} alt="logo" className={styles.logo} />
        <div className={styles.leftItem}>{currentTime}</div>
        <div className={styles.leftItem}>
          <Money value={currentPlayer.balance} />
        </div>
      </div>
      <div className={styles.block}>
        {!swap && game.current === currentPlayer._id && (
          <MiniButton onClick={() => setOpenSwap(true)}>Обмен</MiniButton>
        )}
        <MiniButton
          danger
          onClick={() => {
            toast.promise(
              lose({
                players_id: currentPlayer._id,
              }),
              {
                loading: "Выходим из игры",
                success: () => {
                  router.push("/");
                  return "Вы покинули игру";
                },
                error: (error) => error,
              },
            );
          }}
        >
          Покинуть игру
        </MiniButton>
      </div>
    </div>
  );
}
