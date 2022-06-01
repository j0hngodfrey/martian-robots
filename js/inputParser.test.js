const inputParser = require("./inputParser");

const expectedObject = {
  maxHeightIndex: "3",
  maxWidthIndex: "5",
  robotData: [
    {
      instructions: "RFRFRFRF",
      orientation: "E",
      startX: "1",
      startY: "1",
    },
    {
      instructions: "FRRFLLFFRRFLL",
      orientation: "N",
      startX: "3",
      startY: "2",
    },
    {
      instructions: "LLFFFLFLFL",
      orientation: "W",
      startX: "0",
      startY: "3",
    },
  ],
};

describe("When given valid input", () => {
  it("returns an appropriate object", () => {
    expect(
      inputParser(
        "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL"
      )
    ).toEqual(expectedObject);
  });
});

describe("When given valid input but not all whitespace on a single line is spaces", () => {
  it("returns an appropriate object", () => {
    expect(
      inputParser(
        "5\t3\n1\t1\vE\nRFRFRFRF\n3\f2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL"
      )
    ).toEqual(expectedObject);
  });
});

describe("When given valid input that uses CRLF line endings", () => {
  it("returns an appropriate object", () => {
    expect(
      inputParser(
        "5 3\r\n1 1 E\r\nRFRFRFRF\r\n3 2 N\r\nFRRFLLFFRRFLL\r\n0 3 W\r\nLLFFFLFLFL"
      )
    ).toEqual(expectedObject);
  });
});

describe("When given valid input with extra lines between the robots", () => {
  it("returns an appropriate object", () => {
    expect(
      inputParser(
        "5 3\r\n1 1 E\r\nRFRFRFRF\r\n\r\n3 2 N\r\nFRRFLLFFRRFLL\r\n\r\n0 3 W\r\nLLFFFLFLFL"
      )
    ).toEqual(expectedObject);
  });
});

describe("When given input of the maximum sizes specified", () => {
  it("returns an appropriate object", () => {
    expect(
      inputParser(
        "50 50\r\n0 0 E\r\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFLFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
      )
    ).toEqual({
      maxHeightIndex: "50",
      maxWidthIndex: "50",
      robotData: [
        {
          instructions:
            "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFLFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
          orientation: "E",
          startX: "0",
          startY: "0",
        },
      ],
    });
  });
});
