import { CardListBaseInterface } from "@/interfaces/card/CardListBaseInterface";

export interface CardListNatureInterface extends CardListBaseInterface {
  class: "nature";
  buy: number;
  unlock: number;
  rent: [number, number];
  group: number[];
}
