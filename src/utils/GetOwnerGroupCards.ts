import { CardsGetType } from "@/types/CardsGetType";
import { CardListType } from "@/types/card/CardListType";

export const GetOwnerGroupCards = (
  cards: CardsGetType[],
  currentCard: CardListType,
): boolean => {
  if (currentCard.class !== "street") return false;
  const group = currentCard.group;
  const owner = cards[currentCard.index]!.owner;
  if (owner === undefined) return false;
  for (const index of group) {
    if (cards[index]!.owner !== owner) return false;
  }
  return true;
};
