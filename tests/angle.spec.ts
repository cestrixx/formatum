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

describe("Angle", () => {
  it.skip("DMS String To Degree", () => {
    const dms1 = dmsStringToDegree("91°10'59.98999999\"");
    const dms2 = dmsStringToDegree("91 1059.98999999");
    const dms3 = dmsStringToDegree("91 10 59.98999999");
    const expected = 91.18333055555277;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it.skip("DM String To Degree", () => {
    const dms1 = dmStringToDegree("91°10'");
    const dms2 = dmStringToDegree("91 10");
    const expected = 91.16666666666667;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
  });
  it.skip("Angle To DMS", () => {
    const dms1 = angleToDms("91°10'59.98999999\"");
    const dms2 = angleToDms("91 1059.98999999");
    const dms3 = angleToDms("91 10 59.98999999");
    const expected = { valid: true, degrees: 91, minutes: 10, seconds: 59.98999999 }
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it.skip("Angle To Degrees", () => {
    const dms1 = angleToDegrees("91°10'59.99");
    const dms2 = angleToDegrees("91 105999");
    const dms3 = angleToDegrees("91 10 59.99");
    const expected = 91.18333055555556;
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it.skip("Angle To DM", () => {
    const dms1 = angleToDm("91°10'59.98999999\"");
    const dms2 = angleToDm("91 1059.98999999");
    const dms3 = angleToDm("91 10 59.98999999");
    const expected = { valid: true, degrees: 91, minutes: 10 };
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it.skip("Degrees To DMS", () => {
    const dms1 = degreesToDms(91.183333);
    const expected = { degrees: 91, minutes: 10, seconds: 59, milliseconds: 99880000000121080000 };
    expect(dms1).toEqual(expected);
  });
  it.skip("Degrees To DMS String", () => {
    const dms1 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%01d\"");
    // const dms2 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%08d\"");
    // const dms3 = degreesToDegreeMinuteSecondString(91.183333, "%02d°%02d'%02d.%08d\"");
    const expected = "91°10'59.99880000\"";
    expect(dms1).toEqual(expected);
    // expect(dms2).toEqual(expected);
    // expect(dms3).toEqual(expected);
  });
  it.skip("Degrees To DM", () => {
    const dms = degreesToDm(91.183333);
    const expected = { degrees: 91, minutes: 10, milliseconds: 99998000000050530000 };
    expect(dms).toEqual(expected);
  });
  it.skip("Degrees To DM String", () => {
    const dms1 = degreesToDegreeMinuteString(91.183333, "%02d°%02d'");
    const dms2 = degreesToDegreeMinuteString(91.183333, "%02d°%02d'");
    const dms3 = degreesToDegreeMinuteString(91.183333, "%02d°%02d'");
    const expected = "91°10'";
    expect(dms1).toEqual(expected);
    expect(dms2).toEqual(expected);
    expect(dms3).toEqual(expected);
  });
  it.skip("Degrees To Rumo String", () => {
    const dms = degreesToRumoString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "91°59'59.98999999998043619328\" SE";
    expect(dms).toEqual(expected);
  });
  it.skip("Degrees To Latitude String", () => {
    const dms = degreesToLatitudeString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "91°59'59.98999999998043619328\" N";
    expect(dms).toEqual(expected);
  });
  it.skip("Degrees To Longitude String", () => {
    const dms = degreesToLongitudeString(91.183333, "%02d°%02d'%02d.%020d\"");
    const expected = "91°59'59.98999999998043619328\" E";
    expect(dms).toEqual(expected);
  });
  it("Value To DMS String", () => {
    const degrees = angleToDegrees("91.595999");
    const dms = degreesToDegreeMinuteSecondString(degrees, "%02d°%02d'%02d.%020d\"");
    const expected = "91°59'59.98999999998043619328\"";
    expect(dms).toEqual(expected);
  });
});

