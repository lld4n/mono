import { CardClassType } from "@/types/card/CardClassType";
import { StaticImageData } from "next/image";

export interface CardListBaseInterface {
  svg: StaticImageData;
  name: string;
  desc: string;
  class: CardClassType;
  index: number;
}
