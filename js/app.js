#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs/promises");
const inputParser = require("./inputParser");
const plotPath = require("./plotPath");

const getInput = async (inputFilePath) =>
  fs.readFile(inputFilePath, { encoding: "utf8" });

const printResults = (robotData, maxWidthIndex, maxHeightIndex) => {
  const lostRobotHistory = [];
  for (robot of robotData) {
    const outcome = plotPath(
      robot,
      maxWidthIndex,
      maxHeightIndex,
      lostRobotHistory
    );
    if (outcome.isLost) {
      lostRobotHistory.push(outcome);
    }
    console.log(
      `${outcome.x} ${outcome.y} ${outcome.orientation}${
        outcome.isLost ? " LOST" : ""
      }`
    );
  }
};

const start = () => {
  const commandLineInput = yargs
    .usage("Usage: --path <path to plain text input file>")
    .option("p", {
      alias: "path",
      describe: "Path to input text file",
      type: "string",
      demandOption: true,
    }).argv;

  getInput(commandLineInput.path)
    .then((input) => {
      const parsedInput = inputParser(input);
      printResults(
        parsedInput.robotData,
        parsedInput.maxWidthIndex,
        parsedInput.maxHeightIndex
      );
    })
    .catch((err) => console.error(err));
};

module.exports = start;
