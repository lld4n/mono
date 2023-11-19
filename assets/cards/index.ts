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
    svg: cookie,
    type: cardsTypeEnum.STREET,
    group: [11, 13, 14],
    // построить дом, построить отель, залог, купить
    prices: [750, 900, 700, 1400],
    rent: [100, 500, 1500, 4500, 6250, 7500],
    tax: null,
  },
  {
    card_id: 12,
    svg: electricity,
    type: cardsTypeEnum.RESOURCES,
    group: [12, 28],
    // залог, купить
    prices: [750, 1500],
    rent: [100, 250],
    tax: null,
  },
  {
    card_id: 13,
    svg: lollipop,
    type: cardsTypeEnum.STREET,
    group: [11, 13, 14],
    // построить дом, построить отель, залог, купить
    prices: [750, 900, 700, 1400],
    rent: [100, 500, 1500, 4500, 6250, 7500],
    tax: null,
  },
  {
    card_id: 14,
    svg: cake,
    type: cardsTypeEnum.STREET,
    group: [11, 13, 14],
    // построить дом, построить отель, залог, купить
    prices: [750, 900, 800, 1600],
    rent: [120, 600, 1800, 5000, 7000, 9000],
    tax: null,
  },
  {
    card_id: 15,
    svg: trainRight,
    type: cardsTypeEnum.TRAIN,
    group: [5, 15, 25, 35],
    // залог, купить
    prices: [1000, 2000],
    rent: [250, 500, 1000, 2000],
    tax: null,
  },
  {
    card_id: 16,
    svg: hamburger,
    type: cardsTypeEnum.STREET,
    group: [16, 18, 19],
    // построить дом, построить отель, залог, купить
    prices: [1000, 1200, 900, 1800],
    rent: [140, 700, 2000, 5500, 7500, 9500],
    tax: null,
  },
  {
    card_id: 17,
    svg: gift,
    type: cardsTypeEnum.BOX,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 18,
    svg: hotdog,
    type: cardsTypeEnum.STREET,
    group: [16, 18, 19],
    // построить дом, построить отель, залог, купить
    prices: [1000, 1200, 900, 1800],
    rent: [140, 700, 2000, 5500, 7500, 9500],
    tax: null,
  },
  {
    card_id: 19,
    svg: pizza,
    type: cardsTypeEnum.STREET,
    group: [16, 18, 19],
    // построить дом, построить отель, залог, купить
    prices: [1000, 1200, 1000, 2000],
    rent: [160, 800, 2200, 6000, 8000, 10000],
    tax: null,
  },
  {
    card_id: 20,
    svg: parking,
    type: cardsTypeEnum.PARKING,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 21,
    svg: pear,
    type: cardsTypeEnum.STREET,
    group: [21, 23, 24],
    // построить дом, построить отель, залог, купить
    prices: [1250, 1500, 1100, 2200],
    rent: [180, 900, 2500, 7000, 8750, 10500],
    tax: null,
  },
  {
    card_id: 22,
    svg: dice,
    type: cardsTypeEnum.CHANCE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 23,
    svg: apple,
    type: cardsTypeEnum.STREET,
    group: [21, 23, 24],
    // построить дом, построить отель, залог, купить
    prices: [1250, 1500, 1100, 2200],
    rent: [180, 900, 2500, 7000, 8750, 10500],
    tax: null,
  },
  {
    card_id: 24,
    svg: watermelon,
    type: cardsTypeEnum.STREET,
    group: [21, 23, 24],
    // построить дом, построить отель, залог, купить
    prices: [1250, 1500, 1200, 2400],
    rent: [200, 1000, 3000, 7500, 9250, 11000],
    tax: null,
  },
  {
    card_id: 25,
    svg: trainBottom,
    type: cardsTypeEnum.TRAIN,
    group: [5, 15, 25, 35],
    // залог, купить
    prices: [1000, 2000],
    rent: [250, 500, 1000, 2000],
    tax: null,
  },
  {
    card_id: 26,
    svg: whale,
    type: cardsTypeEnum.STREET,
    group: [26, 27, 29],
    // построить дом, построить отель, залог, купить
    prices: [1500, 1700, 1300, 2600],
    rent: [220, 1100, 3300, 8000, 9750, 11500],
    tax: null,
  },
  {
    card_id: 27,
    svg: fish,
    type: cardsTypeEnum.STREET,
    group: [26, 27, 29],
    // построить дом, построить отель, залог, купить
    prices: [1500, 1700, 1300, 2600],
    rent: [220, 1100, 3300, 8000, 9750, 11500],
    tax: null,
  },
  {
    card_id: 28,
    svg: water,
    type: cardsTypeEnum.RESOURCES,
    group: [12, 28],
    // залог, купить
    prices: [750, 1500],
    rent: [100, 250],
    tax: null,
  },
  {
    card_id: 29,
    svg: dolphin,
    type: cardsTypeEnum.STREET,
    group: [26, 27, 29],
    // построить дом, построить отель, залог, купить
    prices: [1500, 1700, 1400, 2800],
    rent: [240, 1200, 3600, 8500, 10250, 12000],
    tax: null,
  },
  {
    card_id: 30,
    svg: police,
    type: cardsTypeEnum.POLICE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 31,
    svg: fir,
    type: cardsTypeEnum.STREET,
    group: [31, 32, 34],
    // построить дом, построить отель, залог, купить
    prices: [1750, 1900, 1500, 3000],
    rent: [260, 1300, 3900, 9000, 11000, 12750],
    tax: null,
  },
  {
    card_id: 32,
    svg: leaf,
    type: cardsTypeEnum.STREET,
    group: [31, 32, 34],
    // построить дом, построить отель, залог, купить
    prices: [1750, 1900, 1500, 3000],
    rent: [260, 1300, 3900, 9000, 11000, 12750],
    tax: null,
  },
  {
    card_id: 33,
    svg: gift,
    type: cardsTypeEnum.BOX,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 34,
    svg: cactus,
    type: cardsTypeEnum.STREET,
    group: [31, 32, 34],
    // построить дом, построить отель, залог, купить
    prices: [1750, 1900, 1600, 3200],
    rent: [280, 1500, 4500, 10000, 12000, 14000],
    tax: null,
  },
  {
    card_id: 35,
    svg: trainLeft,
    type: cardsTypeEnum.TRAIN,
    group: [5, 15, 25, 35],
    // залог, купить
    prices: [1000, 2000],
    rent: [250, 500, 1000, 2000],
    tax: null,
  },
  {
    card_id: 36,
    svg: dice,
    type: cardsTypeEnum.CHANCE,
    group: null,
    prices: null,
    rent: null,
    tax: null,
  },
  {
    card_id: 37,
    svg: carrot,
    type: cardsTypeEnum.STREET,
    group: [37, 39],
    // построить дом, построить отель, залог, купить
    prices: [2000, 2200, 1750, 3500],
    rent: [350, 1750, 5000, 11000, 13000, 15000],
    tax: null,
  },
  {
    card_id: 38,
    svg: banknote,
    type: cardsTypeEnum.TAX,
    group: null,
    prices: null,
    rent: null,
    tax: 1000,
  },
  {
    card_id: 39,
    svg: pepper,
    type: cardsTypeEnum.STREET,
    group: [37, 39],
    // построить дом, построить отель, залог, купить
    prices: [2000, 2200, 2000, 4000],
    rent: [500, 2000, 6000, 14000, 17000, 20000],
    tax: null,
  },
];
