import { PlayersGetType } from "@/types/PlayersGetType";
import { figuresList } from "@/constants/figures";

export const GetFigureFromSelected = (player: PlayersGetType) => {
  for (const figure of figuresList) {
    if (figure.index === player.selected) {
      return {
        bg: figure.bg,
        color: figure.color,
      };
    }
  }
  return {
    bg: "#FFF",
    color: "#000",
  };
};
