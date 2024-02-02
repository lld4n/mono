export const getCoordinates = (position: number) => {
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
  return {
    top: currentTopPosition,
    left: currentLeftPosition,
  };
};
