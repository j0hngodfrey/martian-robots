#!/usr/bin/env node

const moveForward = require("./moveForward");
const turnRight = require("./turnRight");
const turnLeft = require("./turnLeft");

const instructionProvider = (instructionCharacter) => {
  switch (instructionCharacter) {
    case "R":
      return turnRight;
    case "L":
      return turnLeft;
    case "F":
      return moveForward;
    default:
      throw new Error(`Unsupported instruction: ${instructionCharacter}`);
  }
};

module.exports = instructionProvider;
