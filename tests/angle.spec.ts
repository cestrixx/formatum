import {
  dmsStringToDegree,
  dmStringToDegree,
  angleToDms,
  angleToDegrees,
  angleToDm,
  degreesToDms,
  degreesToDegreeMinuteSecondString,
  degreesToDm,
  degreesToDegreeMinuteString,
  degreesToLatitudeString,
  degreesToLongitudeString,
  degreesToRumoString
} from "../src/angle"

import { Format, Units } from "../src/index";

describe("Angle", () => {
  it("DMS String To Degree", () => {
    const dms1 = dmsStringToDegree("91°10'59.98999999\"");
    const dms2 = dmsStringToDegree("91 1059.98999999");
    const dms3 = dmsStringToDegree("91 10 59.98999999");
    const expected = 91.18333055555277;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it("DM String To Degree", () => {
    const dms1 = dmStringToDegree("91°10'");
    const dms2 = dmStringToDegree("91 10");
    const expected = 91.16666666666667;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
  });
  it("Angle To DMS", () => {
    const dms1 = angleToDms("91°10'59.98999999\"");
    const dms2 = angleToDms("91 1059.98999999");
    const dms3 = angleToDms("91 10 59.98999999");
    const expected = { valid: true, degrees: 91, minutes: 10, seconds: 59.98999999 }
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it("Angle To Degrees", () => {
    const dms1 = angleToDegrees("91°10'59.99");
    const dms2 = angleToDegrees("91 105999");
    const dms3 = angleToDegrees("91 10 59.99");
    const expected = 91.18333055555556;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it("Angle To DM", () => {
    const dms1 = angleToDm("91°10'59.98999999\"");
    const dms2 = angleToDm("91 1059.98999999");
    const dms3 = angleToDm("91 10 59.98999999");
    const expected = { valid: true, degrees: 91, minutes: 10 };
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it("Degrees To DMS", () => {
    const dms1 = degreesToDms(91.183333);
    const expected = { degrees: 91, minutes: 10, seconds: 59, milliseconds: 99879999999140950000 };
    expect(dms1).toEqual(expected);
  });
  it("Degrees To DMS String", () => {
    const dms1 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%01d\"");
    const expected = "91°11'00.0\"";
    expect(dms1).toEqual(expected);
  });
  it("Degrees To DMS String", () => {
    const dms1 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%08d\"");
    const expected = "91°10'59.99880000\"";
    expect(dms1).toEqual(expected);
  });
  it("Degrees To DMS String", () => {
    const dms1 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%20d\"");
    const expected = "91°10'59.99879999999140954112\"";
    expect(dms1).toEqual(expected);
  });
  it("Degrees To DM", () => {
    const dms = degreesToDm(91.183333);
    const expected = { degrees: 91, minutes: 10, milliseconds: 99998000000050530000 };
    expect(dms).toEqual(expected);
  });
  it("Degrees To DM String", () => {
    const dms1 = degreesToDegreeMinuteString(91.183333, "%02d°%02d'");
    const expected = "91°10'";
    expect(dms1).toEqual(expected);
  });
  it("Degrees To Rumo String", () => {
    const dms = degreesToRumoString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "88°49'00.00119999996765405184\" SE";
    expect(dms).toEqual(expected);
  });
  it("Degrees To Latitude String", () => {
    const dms = degreesToLatitudeString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "91°10'59.99879999999140954112\" N";
    expect(dms).toEqual(expected);
  });
  it("Degrees To Longitude String", () => {
    const dms = degreesToLongitudeString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "91°10'59.99879999999140954112\" E";
    expect(dms).toEqual(expected);
  });
  it("Value To DMS String", () => {
    const dms = Format.valueToValue(83.33333333333333, Units.Degree, Units.DegreeMinuteSecond, "%02d°%02d'%02d\"")
    const expected = "83°20'00\"";
    expect(dms).toEqual(expected);

    // Format.setThrowError(true);
    // const dms = Format.valueToValue("gg", Units.DegreeMinuteSecond, Units.Degree);
    // console.log(dms);
  });
});

