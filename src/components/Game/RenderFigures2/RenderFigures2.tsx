import React, { CSSProperties } from "react";
import { PlayersGetType } from "@/types/PlayersGetType";
import Image from "next/image";
import styles from "./RenderFigures2.module.scss";
import { figuresList } from "@/constants/figures";

type LocType = { top: number; left: number };
const PosToLoc: LocType[] = [
  { top: 0, left: 0 },
  { top: 0, left: 119 },
  { top: 0, left: 185 },
  { top: 0, left: 251 },
  { top: 0, left: 317 },
  { top: 0, left: 383 },
  { top: 0, left: 449 },
  { top: 0, left: 515 },
  { top: 0, left: 581 },
  { top: 0, left: 647 },
  { top: 0, left: 713 },

  { top: 119, left: 713 },
  { top: 185, left: 713 },
  { top: 251, left: 713 },
  { top: 317, left: 713 },
  { top: 383, left: 713 },
  { top: 449, left: 713 },
  { top: 515, left: 713 },
  { top: 581, left: 713 },
  { top: 647, left: 713 },
  { top: 713, left: 713 },

  { top: 713, left: 647 },
  { top: 713, left: 581 },
  { top: 713, left: 515 },
  { top: 713, left: 449 },
  { top: 713, left: 383 },
  { top: 713, left: 317 },
  { top: 713, left: 251 },
  { top: 713, left: 185 },
  { top: 713, left: 119 },

  { top: 713, left: 0 },
  { top: 647, left: 0 },
  { top: 581, left: 0 },
  { top: 515, left: 0 },
  { top: 449, left: 0 },
  { top: 383, left: 0 },
  { top: 317, left: 0 },
  { top: 251, left: 0 },
  { top: 185, left: 0 },
  { top: 119, left: 0 },
];

export default function RenderFigures2({ players }: { players: PlayersGetType[] }) {
  const [FigToPos, setFigToPos] = React.useState<number[]>(new Array(8).fill(-1));

  React.useEffect(() => {
    if (!FigToPos.every((el) => el === -1)) {
      const FigToPosBuffer: number[] = new Array(8).fill(-1);
      for (const player of players) {
        if (!player.loser) {
          FigToPosBuffer[player.selected] = player.position;
        }
      }
      let index = -1;
      for (let i = 0; i < FigToPos.length; i++) {
        if (FigToPos[i] !== FigToPosBuffer[i]) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        const realPos = FigToPosBuffer[index];
        const renderPos = FigToPos[index];
        const principleReal = Math.floor(realPos / 10);
        const principleRender = Math.floor(renderPos / 10);
        let div = -1;
        if (principleReal === principleRender) {
          div = 0;
        } else if (Math.abs(principleReal - principleRender) === 2) {
          div = 2;
        } else {
          div = 1;
        }
        if (div === 0) {
          setFigToPos(FigToPosBuffer);
        } else if (div === 1) {
          const b = [...FigToPos];
          b[index] = (renderPos + (10 - (renderPos % 10))) % 40;
          setFigToPos(b);
          setTimeout(() => {
            setFigToPos(FigToPosBuffer);
          }, 100);
        } else if (div === 2) {
          const b = [...FigToPos];
          b[index] = (renderPos + (10 - (renderPos % 10))) % 40;
          setFigToPos(b);
          setTimeout(() => {
            const bb = [...b];
            bb[index] = (b[index] + 10) % 40;
            setFigToPos(bb);
          }, 100);
          setTimeout(() => {
            setFigToPos(FigToPosBuffer);
          }, 200);
        }
      }
    }
  }, [players]);

  React.useEffect(() => {
    const FigToPosBuffer: number[] = new Array(8).fill(-1);
    for (const player of players) {
      if (!player.loser) {
        FigToPosBuffer[player.selected] = player.position;
      }
    }
    setFigToPos(FigToPosBuffer);
  }, []);

  const generatePosToGroupFig = () => {
    const PosToGroupFig: {
      [pos: number]: number[];
    } = {};
    for (let i = 0; i < FigToPos.length; i++) {
      if (FigToPos[i] !== -1) {
        if (PosToGroupFig[FigToPos[i]]) {
          PosToGroupFig[FigToPos[i]].push(i);
        } else {
          PosToGroupFig[FigToPos[i]] = [i];
        }
      }
    }
    return PosToGroupFig;
  };
  const generateLoc = (): LocType[] => {
    const PosToGroupFig = generatePosToGroupFig();
    const Loc: LocType[] = new Array(8).fill({ top: 0, left: 0 });
    for (const pos in PosToGroupFig) {
      const groupFig = PosToGroupFig[pos];
      const Pos = Number(pos);
      if (groupFig.length === 1) {
        if (Pos % 10 === 0) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 44,
          };
        } else if ((Pos >= 1 && Pos <= 9) || (Pos >= 21 && Pos <= 29)) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 17,
          };
        } else {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 44,
          };
        }
      } else if (groupFig.length === 2) {
        if (Pos % 10 === 0) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 18,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 70,
          };
        } else if ((Pos >= 1 && Pos <= 9) || (Pos >= 21 && Pos <= 29)) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 18,
            left: PosToLoc[Pos % 40].left + 17,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 70,
            left: PosToLoc[Pos % 40].left + 17,
          };
        } else {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 18,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 70,
          };
        }
      } else if (groupFig.length === 3) {
        if (Pos % 10 === 0) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 44,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 77,
          };
        } else if ((Pos >= 1 && Pos <= 9) || (Pos >= 21 && Pos <= 29)) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 9,
            left: PosToLoc[Pos % 40].left + 17,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 43,
            left: PosToLoc[Pos % 40].left + 17,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 17,
          };
        } else {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 9,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 43,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 77,
          };
        }
      } else if (groupFig.length === 4) {
        if (Pos % 10 === 0) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 77,
          };
        } else if ((Pos >= 1 && Pos <= 9) || (Pos >= 21 && Pos <= 29)) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 10,
            left: PosToLoc[Pos % 40].left,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 34,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 34,
          };
        } else {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top,
            left: PosToLoc[Pos % 40].left + 10,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 34,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 34,
            left: PosToLoc[Pos % 40].left + 77,
          };
        }
      } else {
        if (Pos % 10 === 0) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[4]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 44,
          };
        } else if ((Pos >= 1 && Pos <= 9) || (Pos >= 21 && Pos <= 29)) {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top + 10,
            left: PosToLoc[Pos % 40].left,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 11,
            left: PosToLoc[Pos % 40].left + 34,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 77,
            left: PosToLoc[Pos % 40].left + 34,
          };
          Loc[groupFig[4]] = {
            top: PosToLoc[Pos % 40].top + 44,
            left: PosToLoc[Pos % 40].left + 17,
          };
        } else {
          Loc[groupFig[0]] = {
            top: PosToLoc[Pos % 40].top,
            left: PosToLoc[Pos % 40].left + 10,
          };
          Loc[groupFig[1]] = {
            top: PosToLoc[Pos % 40].top + 34,
            left: PosToLoc[Pos % 40].left + 11,
          };
          Loc[groupFig[2]] = {
            top: PosToLoc[Pos % 40].top,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[3]] = {
            top: PosToLoc[Pos % 40].top + 34,
            left: PosToLoc[Pos % 40].left + 77,
          };
          Loc[groupFig[4]] = {
            top: PosToLoc[Pos % 40].top + 17,
            left: PosToLoc[Pos % 40].left + 43,
          };
        }
      }
    }
    return Loc;
  };

  const getPosition = (index: number): CSSProperties => {
    const Loc = generateLoc();
    return {
      top: Loc[index].top,
      left: Loc[index].left,
    };
  };

  return (
    <>
      {FigToPos.map((el, i) => {
        if (el !== -1) {
          return (
            <Image
              key={i}
              src={figuresList[i].svg}
              alt="figure"
              className={styles.image}
              style={getPosition(i)}
            />
          );
        }
      })}
    </>
  );
}
