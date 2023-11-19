import React from 'react';
import { gameType } from '../types/gameType';

export type GameContextType = {
  game: gameType;
} | null;

export const GameContext = React.createContext<GameContextType>(null);
