const moveForward = require("./moveForward");

describe("When provided with history of a robot that has fallen off the grid at the current spot", () => {
  it("should ignore the instruction and return the original state", () => {
    expect(
      moveForward({ x: "testX", y: "testY", orientation: "testOrientation" }, [
        { x: "testX", y: "testY", orientation: "testOrientation" },
      ])
    ).toEqual({ x: "testX", y: "testY", orientation: "testOrientation" });
  });
});

describe("Moving forward with an orientation of north", () => {
  it("should increment the y property of the passed-in state", () => {
    expect(moveForward({ x: "testX", y: 1, orientation: "N" }, [])).toEqual({
      x: "testX",
      y: 2,
      orientation: "N",
    });
  });
});

describe("Moving forward with an orientation of east", () => {
  it("should increment the x property of the passed-in state", () => {
    expect(moveForward({ x: 1, y: 1, orientation: "E" }, [])).toEqual({
      x: 2,
      y: 1,
      orientation: "E",
    });
  });
});

describe("Moving forward with an orientation of south", () => {
  it("should decrement the y property of the passed-in state", () => {
    expect(moveForward({ x: 1, y: 1, orientation: "S" }, [])).toEqual({
      x: 1,
      y: 0,
      orientation: "S",
    });
  });
});

describe("Moving forward with an orientation of west", () => {
  it("should decrement the x property of the passed-in state", () => {
    expect(moveForward({ x: 1, y: 1, orientation: "W" }, [])).toEqual({
      x: 0,
      y: 1,
      orientation: "W",
    });
  });
});
