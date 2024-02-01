import React from "react";
import styles from "./OpenBlock.module.scss";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import MiniLoading from "@/components/Global/MiniLoading/MiniLoading";
import { ReformatDate } from "@/utils/ReformatDate";
import Link from "next/link";
import { getPlayerAdmin } from "@/utils/GetPlayerAdmin";
import Button from "@/components/Global/Button/Button";

export default function OpenBlock({ game }: { game: Doc<"games"> }) {
  const players = useQuery(api.players.getAllByGames, {
    games_id: game._id,
  });
  if (!players) {
    return (
      <div className={styles.wrapper}>
        <MiniLoading />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.players}>
        {players.map((player) => {
          return (
            <Image
              src={player.user!.picture}
              alt="avatar"
              key={player.user!._id}
              width={30}
              height={30}
              className={styles.avatar}
            />
          );
        })}
      </div>
      <div className={styles.item}>
        <div className={styles.text}>Создатель</div>
        <div className={styles.block}>
          {getPlayerAdmin(players, game)!.user!.name}
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>Количество игроков</div>
        <div className={styles.block}>{game.players_count} из 5</div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>Время создания</div>
        <div className={styles.block}>{ReformatDate(game._creationTime)}</div>
      </div>
      <Link href={"/room/" + game._id}>
        <Button>Присоединиться</Button>
      </Link>
    </div>
  );
}
