#!/usr/bin/env node

const getOrientationForLeftTurn = (currentOrientation) => {
  switch (currentOrientation) {
    case "N":
      return "W";
    case "E":
      return "N";
    case "S":
      return "E";
    case "W":
      return "S";
  }
};

const turnLeft = (state) => {
  const updatedOrientation = getOrientationForLeftTurn(state.orientation);
  return { ...state, orientation: updatedOrientation };
};

module.exports = turnLeft;
