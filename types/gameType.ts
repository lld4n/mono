export type gameType = {
  chat_id: string;
  game_id: string;
  players: gamePlayersType[];
  created: number;
  started: number;
};

export type gamePlayersType = {
  display_name: string;
  email: string;
  photo_url: string;
  selected_character: gamePlayersSelectedCharacterType;
  type: gamePlayersTypeEnum;
  hash: string;
};

export enum gamePlayersTypeEnum {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
}

export type gamePlayersSelectedCharacterType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
