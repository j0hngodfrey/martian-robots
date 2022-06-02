const start = require("./app");
const yargs = require("yargs");
const fs = require("fs/promises");
const inputParser = require("./inputParser");
const plotPath = require("./plotPath");
jest.mock("yargs");
jest.mock("./inputParser");
jest.mock("fs/promises");
jest.mock("./plotPath");

fs.readFile.mockImplementation(() => Promise.resolve("testInputFile"));
yargs.usage.mockImplementation(() => ({
  option: () => ({
    argv: { path: "testPathToFile" },
  }),
}));
inputParser.mockImplementation(() => ({
  robotData: [{}, {}],
  maxWidthIndex: "testMaxWidthIndex",
  maxHeightIndex: "testMaxHeightIndex",
}));
plotPath.mockImplementation(() => ({
  x: "testX",
  y: "testY",
  orientation: "testOrientation",
  isLost: false,
}));

describe("When invoked at the command line", () => {
  beforeEach(async () => {
    jest.spyOn(console, "log");
    start();
    await new Promise(process.nextTick);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should parse the given input", () => {
    expect(inputParser).toHaveBeenCalledWith("testInputFile");
  });

  it("should compute the path for the given robot's data", () => {
    expect(plotPath).toHaveBeenCalledWith(
      {},
      "testMaxWidthIndex",
      "testMaxHeightIndex",
      []
    );
  });

  it("should print the outcome to the console", () => {
    expect(console.log).toHaveBeenCalledWith("testX testY testOrientation");
  });
});

describe("When a robot is lost", () => {
  beforeEach(async () => {
    plotPath.mockImplementationOnce(() => ({
      isLost: true,
      x: "testX",
      y: "testY",
      orientation: "testOrientation",
    }));
    start();
    await new Promise(process.nextTick);
  });

  it("should pass the data about how the robot was lost when any other robots are processed", () => {
    expect(plotPath).toHaveBeenCalledWith(
      {},
      "testMaxWidthIndex",
      "testMaxHeightIndex",
      [{ x: "testX", y: "testY", orientation: "testOrientation", isLost: true }]
    );
  });

  it("should print the outcome to the console", () => {
    expect(console.log).toHaveBeenCalledWith(
      "testX testY testOrientation LOST"
    );
  });
});

describe("When reading the specified input file fails", () => {
  beforeEach(async () => {
    jest.spyOn(console, "error");
    fs.readFile.mockImplementation(() => Promise.reject("testErrorMessage"));
    start();
    await new Promise(process.nextTick);
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("should log the error message to the console", () => {
    expect(console.error).toHaveBeenCalledWith("testErrorMessage");
  });
});
