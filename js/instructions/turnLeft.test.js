const turnLeft = require("./turnLeft");

describe("Turning left with an orientation of north", () => {
  it("should result in a state object with an orientation of W", () => {
    expect(
      turnLeft({ orientation: "N", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "W", anotherProperty: "anotherValue" });
  });
});

describe("Turning left with an orientation of east", () => {
  it("should result in a state object with an orientation of N", () => {
    expect(
      turnLeft({ orientation: "E", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "N", anotherProperty: "anotherValue" });
  });
});

describe("Turning left with an orientation of south", () => {
  it("should result in a state object with an orientation of E", () => {
    expect(
      turnLeft({ orientation: "S", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "E", anotherProperty: "anotherValue" });
  });
});

describe("Turning left with an orientation of west", () => {
  it("should result in a state object with an orientation of S", () => {
    expect(
      turnLeft({ orientation: "W", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "S", anotherProperty: "anotherValue" });
  });
});
