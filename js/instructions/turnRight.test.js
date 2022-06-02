const turnRight = require("./turnRight");

describe("Turning right with an orientation of north", () => {
  it("should result in a state object with an orientation of E", () => {
    expect(
      turnRight({ orientation: "N", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "E", anotherProperty: "anotherValue" });
  });
});

describe("Turning right with an orientation of east", () => {
  it("should result in a state object with an orientation of S", () => {
    expect(
      turnRight({ orientation: "E", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "S", anotherProperty: "anotherValue" });
  });
});

describe("Turning right with an orientation of south", () => {
  it("should result in a state object with an orientation of W", () => {
    expect(
      turnRight({ orientation: "S", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "W", anotherProperty: "anotherValue" });
  });
});

describe("Turning right with an orientation of west", () => {
  it("should result in a state object with an orientation of N", () => {
    expect(
      turnRight({ orientation: "W", anotherProperty: "anotherValue" })
    ).toEqual({ orientation: "N", anotherProperty: "anotherValue" });
  });
});
