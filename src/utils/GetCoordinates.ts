export const getCoordinates = (position: number, count: number, players: number[]) => {
  let currentTopPosition = 0;
  let currentLeftPosition = 0;
  if (position === 0) {
    currentTopPosition = 45;
    currentLeftPosition = 45;
  } else if (position >= 1 && position <= 9) {
    currentTopPosition = 45;
    currentLeftPosition = 70 + 67 * position;
  } else if (position === 10) {
    currentTopPosition = 45;
    currentLeftPosition = 755;
  } else if (position > 10 && position < 20) {
    currentTopPosition = 70 + 66 * (position % 10);
    currentLeftPosition = 755;
  } else if (position === 20) {
    currentTopPosition = 755;
    currentLeftPosition = 755;
  } else if (position >= 21 && position <= 29) {
    currentTopPosition = 755;
    currentLeftPosition = 735 - 66 * (position % 10);
  } else if (position === 30) {
    currentTopPosition = 755;
    currentLeftPosition = 45;
  } else if (position > 30 && position <= 39) {
    currentTopPosition = 730 - 66 * (position % 30);
    currentLeftPosition = 45;
  }

  if (count === 1) {
    return {
      top: currentTopPosition,
      left: currentLeftPosition,
    };
  } else {
    return move(count, position, currentTopPosition, currentLeftPosition, players);
  }
};

let proceeded: number[] = [];
const move = (
  count: number,
  position: number,
  top: number,
  left: number,
  players: number[],
) => {
  if (count === 2) {
    for (let player of players) {
      if ((position >= 0 && position <= 10) || (position >= 20 && position <= 30)) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 25,
            left,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded = [];
          return {
            top: top + 25,
            left,
          };
        }
      } else if (
        (position >= 11 && position <= 19) ||
        (position >= 31 && position <= 39)
      ) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top,
            left: left - 25,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded = [];
          return {
            top,
            left: left + 25,
          };
        }
      }
    }
  }
  if (count === 3) {
    for (let player of players) {
      if ((position >= 0 && position <= 10) || (position >= 20 && position <= 30)) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 35,
            left,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 35,
            left,
          };
        } else if (player === 2) {
          proceeded = [];
          return {
            top,
            left,
          };
        }
      } else if (
        (position >= 11 && position <= 19) ||
        (position >= 31 && position <= 39)
      ) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top,
            left: left - 30,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top,
            left: left + 30,
          };
        } else if (player === 2) {
          proceeded = [];
          return {
            top,
            left,
          };
        }
      }
    }
  }

  if (count === 4) {
    for (let player of players) {
      if ((position >= 0 && position <= 10) || (position >= 20 && position <= 30)) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 35,
            left: left - 35,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 35,
            left: left + 35,
          };
        } else if (player === 2 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 35,
            left: left + 35,
          };
        } else if (player === 3) {
          proceeded = [];
          return {
            top: top + 35,
            left: left - 35,
          };
        }
      } else if (
        (position >= 11 && position <= 19) ||
        (position >= 31 && position <= 39)
      ) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 15,
            left: left - 30,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 15,
            left: left + 30,
          };
        } else if (player === 2 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 15,
            left: left + 30,
          };
        } else if (player === 3) {
          proceeded = [];
          return {
            top: top + 15,
            left: left - 30,
          };
        }
      }
    }
  }
  if (count === 5) {
    for (let player of players) {
      if ((position >= 0 && position <= 10) || (position >= 20 && position <= 30)) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 35,
            left: left - 35,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 35,
            left: left + 35,
          };
        } else if (player === 2 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 35,
            left: left + 35,
          };
        } else if (player === 3) {
          proceeded = [];
          return {
            top: top + 35,
            left: left - 35,
          };
        }
      } else if (
        (position >= 11 && position <= 19) ||
        (position >= 31 && position <= 39)
      ) {
        if (player === 0 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 15,
            left: left - 30,
          };
        } else if (player === 1 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 15,
            left: left + 30,
          };
        } else if (player === 2 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top - 15,
            left: left + 30,
          };
        } else if (player === 3 && !proceeded.includes(player)) {
          proceeded.push(player);
          return {
            top: top + 15,
            left: left - 30,
          };
        } else if (player === 4) {
          proceeded = [];
          return {
            top,
            left,
          };
        }
      }
    }
  }
  return {
    top,
    left,
  };
};
