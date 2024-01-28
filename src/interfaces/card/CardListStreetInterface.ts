import { CardListBaseInterface } from "@/interfaces/card/CardListBaseInterface";
import { CardClassType } from "@/types/card/CardClassType";

export interface CardListStreetInterface extends CardListBaseInterface {
  class: "street";
  buy: number;
  unlock: number;
  build: number;
  rent: [number, number, number, number, number, number, number];
  group: number[];
}
