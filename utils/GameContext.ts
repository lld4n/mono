import React from 'react';
import { gameType } from '../types/gameType';

export type GameContextType = {
  openCard: number;
  setOpenCard: React.Dispatch<React.SetStateAction<number>>;
  game: gameType;
} | null;

export const GameContext = React.createContext<GameContextType>(null);
