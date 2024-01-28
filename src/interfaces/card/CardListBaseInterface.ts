import { CardClassType } from "@/types/card/CardClassType";

export interface CardListBaseInterface {
  svg: string;
  name: string;
  desc: string;
  class: CardClassType;
}
