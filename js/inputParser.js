#!/usr/bin/env node

const inputParser = (input) => {
  const inputLines = input.split(/\r?\n/).filter(Boolean);
  const [maxWidthIndex, maxHeightIndex] = inputLines[0].split(/\s/);
  const robotData = [];
  for (let i = 1; i < inputLines.length; i += 2) {
    const startPositionAndOrientation = inputLines[i];
    const instructions = inputLines[i + 1];
    const [startX, startY, orientation] =
      startPositionAndOrientation.split(/\s/);
    robotData.push({ startX, startY, orientation, instructions });
  }
  return {
    maxWidthIndex,
    maxHeightIndex,
    robotData,
  };
};

module.exports = inputParser;
