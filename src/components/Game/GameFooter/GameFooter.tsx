import { Doc } from "../../../../convex/_generated/dataModel";
import styles from "./GameFooter.module.scss";
import Money from "@/components/Game/Money/Money";
import Timer from "@/components/Game/Timer/Timer";
import Image from "next/image";
import micro_logo from "@/assets/micro-logo.svg";
import MiniButton from "@/components/Global/MiniButton/MiniButton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type PropsType = {
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
};

export default function GameFooter({ currentPlayer, game }: PropsType) {
  const lose = useMutation(api.players.lose);
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image src={micro_logo} alt="logo" className={styles.logo} />
        <div className={styles.leftItem}>
          <Timer time={game.started} />
        </div>
        <div className={styles.leftItem}>
          <Money value={currentPlayer.balance} />
        </div>
      </div>
      <div className={styles.block}>
        <MiniButton>Обмен</MiniButton>
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
