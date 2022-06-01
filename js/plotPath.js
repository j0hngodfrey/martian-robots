#!/usr/bin/env node

const plotPath = (robot, maxWidth, maxHeight, lostRobotHistory) => {
  let remainingInstructions = robot.instructions;
  let state = {
    x: parseInt(robot.startX),
    y: parseInt(robot.startY),
    orientation: robot.orientation,
    isLost: false,
  };
  while (remainingInstructions.length > 0) {
    const currentInstruction = remainingInstructions[0];
    remainingInstructions = remainingInstructions.slice(1);
    nextPosition = applyInstruction(
      currentInstruction,
      state,
      lostRobotHistory
    );
    if (isValid(nextPosition, maxWidth, maxHeight)) {
      state = nextPosition;
    } else {
      return { ...state, isLost: true };
    }
  }
  return state;
};

const applyInstruction = (currentInstruction, state, lostRobotHistory) => {
  switch (currentInstruction) {
    case "R":
      return { ...state, orientation: turnRight(state.orientation) };
    case "L":
      return { ...state, orientation: turnLeft(state.orientation) };
    case "F":
      return moveForward(state, lostRobotHistory);
  }
};

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

const turnRight = (currentOrientation) => {
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

const turnLeft = (currentOrientation) => {
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

const isValid = (position, maxWidth, maxHeight) =>
  position.x >= 0 &&
  position.x <= maxWidth &&
  position.y >= 0 &&
  position.y <= maxHeight;

module.exports = plotPath;
