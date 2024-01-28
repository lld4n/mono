import { CardListBaseInterface } from "@/interfaces/card/CardListBaseInterface";

export interface CardListTrainInterface extends CardListBaseInterface {
  class: "train";
  buy: number;
  unlock: number;
  rent: [number, number, number, number];
  group: number[];
}
