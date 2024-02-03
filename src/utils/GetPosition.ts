type CoordinatesType = {
  left: number;
  top: number;
};

export const getPosition = (coordinates: CoordinatesType): number => {
  const { left, top } = coordinates;

  if (top === 45 && left === 45) {
    return 0;
  } else if (top === 45 && left >= 70 && left <= 755) {
    return Math.floor((left - 70) / 67) + 1;
  } else if (top === 755 && left === 755) {
    return 20;
  } else if (top >= 70 && top <= 730 && left === 755) {
    return 10 + Math.floor((top - 70) / 66);
  } else if (top === 755 && left === 735) {
    return 21;
  } else if (top === 755 && left <= 735 && left >= 665) {
    return 30 + Math.floor((735 - left) / 66);
  } else if (top === 755 && left === 45) {
    return 30;
  } else if (top >= 665 && top <= 730 && left === 45) {
    return 40 - Math.floor((top - 665) / 66);
  } else {
    return -1;
  }
};
