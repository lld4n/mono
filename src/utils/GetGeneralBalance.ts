import { Doc } from "../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import { cardsList } from "@/constants/cards";

export const GetGeneralBalance = (
  player: Doc<"players">,
  cards: CardsGetType[],
) => {
  let generalBalance = player.balance;
  for (let card of cards) {
    if (card) {
      const cardItem = cardsList[card.index];
      if (cardItem.class === "street") {
        generalBalance += cardItem.build * card.status + cardItem.buy / 2;
      } else if (cardItem.class === "train" || cardItem.class === "nature") {
        generalBalance += cardItem.buy / 2;
      }
    }
  }
  return generalBalance;
};
