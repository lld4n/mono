import React from 'react';
import { gameType } from '../types/gameType';

export type GameContextType = {
  openCard: number;
  setOpenCard: React.Dispatch<React.SetStateAction<number>>;
  game: gameType;
  game_id: string;
  throwValue: [number, number];
  setThrowValue: React.Dispatch<React.SetStateAction<[number, number]>>;
} | null;

export const GameContext = React.createContext<GameContextType>(null);
