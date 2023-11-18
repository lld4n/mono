export type gameType = {
  chat_id: string;
  players: gamePlayersType[];
  created: number;
  started: number;
  private: boolean;
  blocked: string[];
};

export type gamePlayersType = {
  display_name: string;
  email: string;
  photo_url: string | null;
  selected_character: gamePlayersSelectedCharacterType;
  type: gamePlayersTypeEnum;
};

export enum gamePlayersTypeEnum {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
}

export type gamePlayersSelectedCharacterType =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7;
