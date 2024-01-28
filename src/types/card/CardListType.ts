import { CardListStreetInterface } from "@/interfaces/card/CardListStreetInterface";
import { CardListTrainInterface } from "@/interfaces/card/CardListTrainInterface";
import { CardListNatureInterface } from "@/interfaces/card/CardListNatureInterface";
import { CardListChanceInterface } from "@/interfaces/card/CardListChanceInterface";
import { CardListChestInterface } from "@/interfaces/card/CardListChestInterface";
import { CardListTaxInterface } from "@/interfaces/card/CardListTaxInterface";
import { CardListEmptyInterface } from "@/interfaces/card/CardListEmptyInterface";
import { CardListJailInterface } from "@/interfaces/card/CardListJailInterface";

export type CardListType =
  | CardListStreetInterface
  | CardListTrainInterface
  | CardListNatureInterface
  | CardListChanceInterface
  | CardListChestInterface
  | CardListTaxInterface
  | CardListEmptyInterface
  | CardListJailInterface;
