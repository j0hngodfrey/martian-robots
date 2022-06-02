const instructionProvider = require("./instructionProvider");
const moveForward = require("./moveForward");
const turnRight = require("./turnRight");
const turnLeft = require("./turnLeft");

describe("When a valid instruction is requested", () => {
  [
    { instruction: "L", fn: turnLeft },
    { instruction: "R", fn: turnRight },
    { instruction: "F", fn: moveForward },
  ].forEach((validValues) => {
    it("should return the appropriate function", () => {
      expect(instructionProvider(validValues.instruction)).toEqual(
        validValues.fn
      );
    });
  });
});

describe("When an invalid instruction is requested", () => {
  it("should throw an error", () => {
    expect(() => instructionProvider("B")).toThrow(
      "Unsupported instruction: B"
    );
  });
});
