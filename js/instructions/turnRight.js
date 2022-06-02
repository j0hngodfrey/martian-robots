#!/usr/bin/env node

const getOrientationForRightTurn = (currentOrientation) => {
  switch (currentOrientation) {
    case "N":
      return "E";
    case "E":
      return "S";
    case "S":
      return "W";
    case "W":
      return "N";
  }
};

const turnRight = (state) => {
  const updatedOrientation = getOrientationForRightTurn(state.orientation);
  return { ...state, orientation: updatedOrientation };
};

module.exports = turnRight;
