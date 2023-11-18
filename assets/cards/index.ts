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
};

export const cardsList: cardsListType[] = [];
