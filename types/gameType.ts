export type gameType = {
  chat_id: string;
  users: gameUsersType[];
  created: number;
  started: number;
  private: boolean;
  blocked: string[];
  characters: {
    [id: number]: number;
  };
  currentMove: {
    email: string;
    valueDice: number;
  };
  auction: {
    started: number;
    card: number;
    minPrice: number;
    players: {
      email: string;
      selected_character: gameSelectedCharacterType;
      stake: number;
      date: number;
    }[];
  } | null;

  cards: {
    status: gameCardsStatusType;
    card_id: number;
    owner_email: string | null;
  }[];
  exchange: {
    sender: gameExchangeType;
    recipient: gameExchangeType;
  } | null;
  prison: {
    email: string;
    tries: number;
  }[];

  players: {
    [email: string]: {
      balance: number;
      selected_character: gameSelectedCharacterType;
      inventory?: number[];
    };
  };
};

export type gameExchangeType = {
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
