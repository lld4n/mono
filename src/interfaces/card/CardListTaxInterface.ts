import { CardListBaseInterface } from "@/interfaces/card/CardListBaseInterface";

export interface CardListTaxInterface extends CardListBaseInterface {
  class: "tax";
  pay: number;
}
