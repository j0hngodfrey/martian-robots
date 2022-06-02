#!/usr/bin/env node
const instructionProvider = require("./instructions/instructionProvider");

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

const applyInstruction = (instruction, state, lostRobotHistory) => {
  const requestedInstruction = instructionProvider(instruction);
  return requestedInstruction(state, lostRobotHistory);
};

const isValid = (position, maxWidth, maxHeight) =>
  position.x >= 0 &&
  position.x <= maxWidth &&
  position.y >= 0 &&
  position.y <= maxHeight;

module.exports = plotPath;
