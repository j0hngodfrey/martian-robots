#!/usr/bin/env node

const moveForward = (state, lostRobotHistory) => {
  if (
    lostRobotHistory.find(
      (lostRobotState) =>
        lostRobotState.x === state.x &&
        lostRobotState.y === state.y &&
        lostRobotState.orientation === state.orientation
    )
  ) {
    return state;
  }

  switch (state.orientation) {
    case "N":
      return { ...state, y: state.y + 1 };
    case "E":
      return { ...state, x: state.x + 1 };
    case "S":
      return { ...state, y: state.y - 1 };
    case "W":
      return { ...state, x: state.x - 1 };
  }
};

module.exports = moveForward;
