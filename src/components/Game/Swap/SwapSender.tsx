import { PlayersGetType } from "@/types/PlayersGetType";
import { CardsGetType } from "@/types/CardsGetType";
import React, { useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import styles from "./Swap.module.scss";
import { figuresList } from "@/constants/figures";
import { ArrowLeftRight } from "lucide-react";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { useSwaps } from "@/hooks/useSwaps";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import Top from "@/components/Game/Swap/Top";
import Inventory from "@/components/Game/Swap/Inventory";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  setOpenSwap: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: Doc<"players">;
};

export default function SwapSender({
  players,
  cards,
  setOpenSwap,
  currentPlayer,
}: PropsType) {
  const [recipient, setRecipient] = useState<PlayersGetType>();

  const [senderMoney, setSenderMoney] = useState<number>(0);
  const [recipientMoney, setRecipientMoney] = useState<number>(0);

  const [senderCards, setSenderCards] = useState<Id<"cards">[]>([]);
  const [recipientCards, setRecipientCards] = useState<Id<"cards">[]>([]);

  const { toastCreateSwaps } = useSwaps();

  function chooseSender(cardId: Id<"cards">) {
    if (senderCards?.includes(cardId)) {
      const buffer = [...senderCards].filter((card) => card !== cardId);
      setSenderCards(buffer);
    } else {
      const buffer = [...senderCards];
      buffer.push(cardId);
      setSenderCards(buffer);
    }
  }

  function chooseRecipient(cardId: Id<"cards">) {
    if (recipientCards?.includes(cardId)) {
      const buffer = [...recipientCards].filter((card) => card !== cardId);
      setRecipientCards(buffer);
    } else {
      const buffer = [...recipientCards];
      buffer.push(cardId);
      setRecipientCards(buffer);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Top setOpenSwap={setOpenSwap} title="Обмен" functionalComponent={true} />
      {!recipient && (
        <div className={styles.choose}>
          <span>Выберите, с кем хотите обменяться</span>
          {players
            .filter((player) => !player.loser && player._id !== currentPlayer._id)
            .map((player) => (
              <IconButton onClick={() => setRecipient(player)}>
                <div
                  key={player._id}
                  className={styles.figure}
                  style={{
                    backgroundColor: figuresList[player.selected].bg,
                  }}
                />
              </IconButton>
            ))}
        </div>
      )}

      {recipient && (
        <div className={styles.swap}>
          <Inventory
            functionalComponent={true}
            player={GetPlayerFromId(players, currentPlayer._id)!}
            cards={cards}
            choose={chooseSender}
            chooseCards={senderCards}
            money={senderMoney}
            setMoney={setSenderMoney}
          />
          <ArrowLeftRight size={16} color={"#ffffff"} />
          <Inventory
            functionalComponent={true}
            player={GetPlayerFromId(players, recipient._id)!}
            cards={cards}
            choose={chooseRecipient}
            chooseCards={recipientCards}
            money={recipientMoney}
            setMoney={setRecipientMoney}
          />
        </div>
      )}
      {recipient && (
        <MiniButton
          className={
            (senderCards.length !== 0 || senderMoney !== 0) &&
            (recipientCards.length !== 0 || recipientMoney !== 0)
              ? styles.send
              : styles.disabled
          }
          onClick={() => {
            if (
              recipient &&
              (senderCards.length !== 0 || senderMoney !== 0) &&
              (recipientCards.length !== 0 || recipientMoney !== 0)
            ) {
              setOpenSwap(false);
              toastCreateSwaps(
                currentPlayer.games_id,
                currentPlayer._id,
                recipient._id,
                senderMoney,
                recipientMoney,
                senderCards,
                recipientCards,
              );
            }
          }}
        >
          Отправить
        </MiniButton>
      )}
    </div>
  );
}
