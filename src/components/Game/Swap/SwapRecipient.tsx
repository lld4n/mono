import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { useSwaps } from "@/hooks/useSwaps";
import styles from "./Swap.module.scss";
import PlayerTimer from "@/components/Game/PlayerTimer/PlayerTimer";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import { CardsGetType } from "@/types/CardsGetType";
import { ArrowLeftRight } from "lucide-react";
import Top from "@/components/Game/Swap/Top";
import Inventory from "@/components/Game/Swap/Inventory";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";

type PropsType = {
  swap: Doc<"swaps">;
  currentPlayer: Doc<"players">;
  players: PlayersGetType[];
  cards: CardsGetType[];
};

export default function SwapRecipient({ swap, players, cards }: PropsType) {
  const { toastRefuse, toastConcur } = useSwaps();

  return (
    <div className={styles.wrapper}>
      <Top title="Тебе предложили обмен" functionalComponent={false} />
      <div className={styles.swap}>
        <Inventory
          functionalComponent={false}
          player={GetPlayerFromId(players, swap.sender)!}
          cards={cards}
          chooseCards={swap.sender_cards}
          money={swap.sender_money}
        />
        <ArrowLeftRight size={16} color={"#ffffff"} />
        <Inventory
          functionalComponent={false}
          player={GetPlayerFromId(players, swap.recipient)!}
          cards={cards}
          chooseCards={swap.recipient_cards}
          money={swap.recipient_money}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.timer}>
          <PlayerTimer timer={swap.timer} />
        </div>
        <MiniButton onClick={() => toastRefuse(swap._id)}>Отказаться</MiniButton>
        <MiniButton onClick={() => toastConcur(swap._id)}>Принять</MiniButton>
      </div>
    </div>
  );
}
