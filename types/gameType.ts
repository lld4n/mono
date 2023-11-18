export type gameType = {
  chat_id: string;
  users: gameUsersType[];
  created: number;
  started: number;
  private: boolean;
  blocked: string[];
  characters: gameCharactersType;
  currentMove: gameCurrentMoveType;
  auction: gameAuctionType;
  cards: gameCardsType[];
  exchange: gameExchangeType;
  prison: gamePrisonType[];
  players: gamePlayersType;
};

export type gameCharactersType = {
  [id: number]: number;
};

export type gameCurrentMoveType = {
  email: string;
  valueDice: number;
};

export type gameAuctionType = {
  started: number;
  card: number;
  minPrice: number;
  players: gameAuctionPlayersType[];
} | null;

export type gameAuctionPlayersType = {
  email: string;
  selected_character: gameSelectedCharacterType;
  stake: number;
  date: number;
};

export type gameCardsType = {
  status: gameCardsStatusType;
  card_id: number;
  owner_email: string | null;
};

export type gameExchangeType = {
  sender: gameExchangeBlockType;
  recipient: gameExchangeBlockType;
} | null;

export type gamePrisonType = {
  email: string;
  tries: number;
};

export type gamePlayersType = {
  [email: string]: {
    balance: number;
    selected_character: gameSelectedCharacterType;
    inventory?: number[];
  };
};

export type gameExchangeBlockType = {
  email: string;
  cards: number[];
  value: number;
};

export type gameCardsStatusType = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;

export type gameUsersType = {
  display_name: string;
  email: string;
  photo_url: string | null;
  selected_character: gameSelectedCharacterType;
  type: gameUsersTypeEnum;
};

export enum gameUsersTypeEnum {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
}

export type gameSelectedCharacterType = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
