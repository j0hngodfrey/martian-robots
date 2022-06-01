const plotPath = require("./plotPath");

describe("Robot goes round in a circle", () => {
  it("should end up in the position it started", () => {
    const result = plotPath(
      {
        startX: "1",
        startY: "1",
        orientation: "E",
        instructions: "RFRFRFRF",
      },
      5,
      3,
      []
    );

    expect(result).toEqual({ isLost: false, orientation: "E", x: 1, y: 1 });
  });
});

describe("Robot goes off the top edge", () => {
  it("should return the last position and orientation it had, and flag that it fell off", () => {
    const result = plotPath(
      {
        startX: "3",
        startY: "2",
        orientation: "N",
        instructions: "FRRFLLFFRRFLL",
      },
      5,
      3,
      []
    );

    expect(result).toEqual({ isLost: true, orientation: "N", x: 3, y: 3 });
  });
});

describe("Robot tries to go off an edge where a previous robot fell off", () => {
  it("should ignore the instruction that would make it fall off", () => {
    const result = plotPath(
      {
        startX: "0",
        startY: "3",
        orientation: "W",
        instructions: "LLFFFLFLFL",
      },
      5,
      3,
      [{ x: 3, y: 3, orientation: "N", isLost: true }]
    );

    expect(result).toEqual({ isLost: false, orientation: "S", x: 2, y: 3 });
  });
});

describe("Robot tries to execute an unsupported instruction", () => {
  it("should throw an error", () => {
    expect(() =>
      plotPath(
        {
          startX: "0",
          startY: "3",
          orientation: "W",
          instructions: "LLBFFLFLFL",
        },
        5,
        3,
        []
      )
    ).toThrow("Unsupported instruction: B");
  });
});
