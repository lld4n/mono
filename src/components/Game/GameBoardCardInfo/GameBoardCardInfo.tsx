import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  openIndex: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: Doc<"players">;
};

export default function GameBoardCardInfo({
  players,
  cards,
  openIndex,
  setOpenIndex,
  currentPlayer,
}: PropsType) {
  return <div></div>;
}
