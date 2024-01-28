import { CardListStreetInterface } from "@/interfaces/card/CardListStreetInterface";
import { CardListTrainInterface } from "@/interfaces/card/CardListTrainInterface";
import { CardListNatureInterface } from "@/interfaces/card/CardListNatureInterface";
import { CardListLuckyInterface } from "@/interfaces/card/CardListLuckyInterface";
import { CardListTaxInterface } from "@/interfaces/card/CardListTaxInterface";
import { CardListEmptyInterface } from "@/interfaces/card/CardListEmptyInterface";
import { CardListJailInterface } from "@/interfaces/card/CardListJailInterface";

export type CardListType =
  | CardListStreetInterface
  | CardListTrainInterface
  | CardListNatureInterface
  | CardListLuckyInterface
  | CardListTaxInterface
  | CardListEmptyInterface
  | CardListJailInterface;
