import apple from './apple.svg';
import parking from './parking.svg';
import pear from './pear.svg';
import watermelon from './watermelon.svg';
import dolphin from './dolphin.svg';
import fir from './fir.svg';
import fish from './fish.svg';
import pizza from './pizza.svg';
import police from './police.svg';
import water from './water.svg';
import whale from './whale.svg';
import cactus from './cactus.svg';
import cake from './cake.svg';
import hamburger from './hamburger.svg';
import hotdog from './hotdog.svg';
import leaf from './leaf.svg';
import trainBottom from './trainBottom.svg';
import trainLeft from './trainLeft.svg';
import trainRight from './trainRight.svg';
import carrot from './carrot.svg';
import cookie from './cookie.svg';
import electricity from './electricity.svg';
import lollipop from './lollipop.svg';
import pepper from './pepper.svg';
import trainTop from './trainTop.svg';
import banknote from './banknote.svg';
import basketball from './basketball.svg';
import dice from './dice.svg';
import prison from './prison.svg';
import soccer from './soccer.svg';
import tennis from './tennis.svg';
import fullMoon from './fullMoon.svg';
import gift from './gift.svg';
import newMoon from './newMoon.svg';
import right from './right.svg';
import rightCurving from './rightCurving.svg';
import prisonArrow from './prisonArrow.svg';

export enum cardsTypeEnum {
  NONE = 'NONE',
  STREET = 'STREET',
  BOX = 'BOX',
  TAX = 'TAX',
  TRAIN = 'TRAIN',
  CHANCE = 'CHANCE',
  RESOURCES = 'RESOURCES',
  PRISON = 'PRISON',
  PARKING = 'PARKING',
  POLICE = 'POLICE',
}

export type cardsListType = {
  svg: string;
  type: cardsTypeEnum;
  card_id: number;
  group: number[] | null;
  rent: number[] | null;
  prices: number[] | null;
  tax: number | null;
};

export const cardsList: cardsListType[] = [
  {
    card_id: 0,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 1,
    svg: fullMoon,
    type: cardsTypeEnum.STREET,
    group: [1, 3],
    // построить дом, построить отель, залог, купить
    prices: [500, 700, 300, 600],
    rent: [20, 100, 300, 900, 1600, 2500],
    tax: null,
  },
  {
    card_id: 2,
    svg: gift,
    type: cardsTypeEnum.BOX,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 3,
    svg: newMoon,
    type: cardsTypeEnum.STREET,
    group: [1, 3],
    // построить дом, построить отель, залог, купить
    prices: [500, 700, 300, 600],
    rent: [40, 200, 600, 1800, 3200, 4500],
    tax: null,
  },
  {
    card_id: 4,
    svg: banknote,
    type: cardsTypeEnum.TAX,
    group: null,
    prices: null,
    rent: null,
    tax: 2000,
  },
  {
    card_id: 5,
    svg: trainTop,
    type: cardsTypeEnum.TRAIN,
    group: [5, 15, 25, 35],
    // залог, купить
    prices: [1000, 2000],
    rent: [250, 500, 1000, 2000],
    tax: null,
  },
  {
    card_id: 6,
    svg: basketball,
    type: cardsTypeEnum.STREET,
    group: [6, 8, 9],
    // построить дом, построить отель, залог, купить
    prices: [500, 700, 500, 1000],
    rent: [60, 300, 900, 2700, 4000, 5500],
    tax: null,
  },
  {
    card_id: 7,
    svg: dice,
    type: cardsTypeEnum.CHANCE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 8,
    svg: soccer,
    type: cardsTypeEnum.STREET,
    group: [6, 8, 9],
    // построить дом, построить отель, залог, купить
    prices: [500, 700, 500, 1000],
    rent: [60, 300, 900, 2700, 4000, 5500],
    tax: null,
  },
  {
    card_id: 9,
    svg: tennis,
    type: cardsTypeEnum.STREET,
    group: [6, 8, 9],
    // построить дом, построить отель, залог, купить
    prices: [600, 800, 600, 1200],
    rent: [80, 400, 1000, 3000, 4500, 6000],
    tax: null,
  },
  {
    card_id: 10,
    svg: prisonArrow,
    type: cardsTypeEnum.PRISON,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 11,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 12,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 13,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 14,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 15,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 16,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 17,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 18,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 19,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 20,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 21,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 22,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 23,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 24,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 25,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 26,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 27,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 28,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 29,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 30,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 31,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 32,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 33,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 34,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 35,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 36,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 37,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 38,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 39,
    svg: right,
    type: cardsTypeEnum.NONE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
];
