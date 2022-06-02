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

describe("Robot tries to go off an edge from a position which is a corner, and a previous robot has gone off the other side", () => {
  it("should fall off", () => {
    const result = plotPath(
      {
        startX: "0",
        startY: "0",
        orientation: "N",
        instructions: "FRFF",
      },
      1,
      1,
      [{ x: 1, y: 1, orientation: "N", isLost: true }]
    );

    expect(result).toEqual({ isLost: true, orientation: "E", x: 1, y: 1 });
  });
});

describe("Robot is given input of the maximum sizes specified", () => {
  it("should return its final location and orientation as usual", () => {
    const result = plotPath(
      {
        instructions:
          "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFLFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
        orientation: "E",
        startX: "0",
        startY: "0",
      },
      50,
      50,
      []
    );
    expect(result).toEqual({
      isLost: false,
      orientation: "N",
      x: 50,
      y: 48,
    });
  });
});

describe("Robot goes round the outside of a grid where previously a robot has fallen off every edge (in both directions on each corner)", () => {
  it("should return its final location and orientation as usual", () => {
    const result = plotPath(
      {
        instructions: "FFFLFFFLFFFLFF",
        orientation: "E",
        startX: "0",
        startY: "0",
      },
      3,
      3,
      [
        { x: 0, y: 0, orientation: "S", isLost: true },
        { x: 0, y: 0, orientation: "W", isLost: true },
        { x: 0, y: 1, orientation: "W", isLost: true },
        { x: 0, y: 2, orientation: "W", isLost: true },
        { x: 0, y: 3, orientation: "W", isLost: true },
        { x: 0, y: 3, orientation: "N", isLost: true },
        { x: 1, y: 3, orientation: "N", isLost: true },
        { x: 2, y: 3, orientation: "N", isLost: true },
        { x: 3, y: 3, orientation: "N", isLost: true },
        { x: 3, y: 3, orientation: "E", isLost: true },
        { x: 3, y: 2, orientation: "E", isLost: true },
        { x: 3, y: 1, orientation: "E", isLost: true },
        { x: 3, y: 0, orientation: "E", isLost: true },
        { x: 3, y: 0, orientation: "S", isLost: true },
        { x: 2, y: 0, orientation: "S", isLost: true },
        { x: 1, y: 0, orientation: "S", isLost: true },
      ]
    );
    expect(result).toEqual({
      isLost: false,
      orientation: "S",
      x: 0,
      y: 1,
    });
  });
});

describe("Robot repeatedly tries to go off an edge where a previous robot fell off", () => {
  it("should stay in the original position", () => {
    const result = plotPath(
      {
        startX: "3",
        startY: "3",
        orientation: "N",
        instructions: "FFFFFFFFFFFFFFFFFFFFFFFFFFF",
      },
      5,
      3,
      [{ x: 3, y: 3, orientation: "N", isLost: true }]
    );

    expect(result).toEqual({ isLost: false, orientation: "N", x: 3, y: 3 });
  });
});
