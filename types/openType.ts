export type openType = {
  [game_id: string]: openPlayersType[];
};

export type openPlayersType = {
  photo_url: string | null;
  display_name: string;
};
