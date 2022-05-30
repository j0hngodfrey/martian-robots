#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const inputParser = require("../js/inputParser");

const commandLineInput = yargs
  .usage("Usage: --path <path to plain text input file>")
  .option("p", {
    alias: "path",
    describe: "Path to input text file",
    type: "string",
    demandOption: true,
  }).argv;

let input;

fs.readFile(commandLineInput.path, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  input = data;
  console.log(inputParser(input));
});
