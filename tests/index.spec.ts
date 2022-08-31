import { Format, Units } from "../src/index";
import { ff } from "../src/format"

describe("Format", () => {
    it("Value(Degree) To Degree", () => {
        expect(Format.valueToAngle("21.613740790767654", Units.Degree)).toEqual(21.613740790767654);
    });
    // it("Value(Degree Minute) To Degree", () => {
    //     expect(Format.valueToAngle("21°36.82444744605924'", Units.DegreeMinuteSecond)).toEqual(21.613740790767654);
    // });
    it("Value(Degree Minute Second) To Degree", () => {
        expect(Format.valueToAngle("21°36'49.466846763554315\"", Units.DegreeMinuteSecond)).toEqual(21.613740790767654);
    });
    it("Angle(Degree) To Value(Degree)", () => {
        expect(Format.angleToValue(21.613740790767654, Units.Degree, "%.10f")).toEqual("21.6137407908")
    });
    // it("Degree To Degree Minute String", () => {
    //     expect(Format.angleToValue(21.613740790767654, Units.DegreeMinute, "%02d°%.10f'")).toEqual("21°36.8244474461'")
    // });
    it("Angle(Degree) To Degree Minute Second String", () => {
        expect(Format.angleToValue(21.613740790767654, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("Value(Degree Minute Second) To Radian", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Radian, "%.10f")).toEqual("0.3772309405")
    });
    it("Value(Degree) To Degree", () => {
        expect(Format.valueToValue("21", Units.Degree, Units.Degree, "%.10f")).toEqual("21.0000000000")
    });
    it("Value(Degree Minute Second) To Degree", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Degree, "%.10f")).toEqual("21.6137407908")
    });
    // it("String To Degree Minute", () => {
    //     expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinute, Units.DegreeMinute, "%02d°%.10f'")).toEqual("21°36.8244474461'")
    // });
    it("Value(Degree Minute Second) To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("Value(Degree Minute Second) To Degree Minute Second [-]", () => {
        expect(Format.valueToValue("-21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("-21°36'49.47\"") //4668467635\"")
    });
    it("Value(Degree Minute Second) To Degree Minute Second [-]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"S", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("-21°36'49.47\"") //4668467635\"")
    });
    it("Value(Degree Minute Second) To Degree Minute Second", () => {
        expect(Format.valueToValue("21 36 49.4668467635", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("Value(Degree Minute Second) To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("21°36'49.47\"")
    });
    it("Value(Degree Minute Second) To Latitude [S]", () => {
        expect(Format.valueToValue("-21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Latitude)).toEqual("21°36'49.47\" S")
    });
    it("Value(Degree Minute Second) To Latitude [N]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Latitude)).toEqual("21°36'49.47\" N")
    });
    it("Value(Degree Minute Second) To Longitude [W]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\" W", Units.Latitude, Units.Longitude)).toEqual("21°36'49.47\" W")
    });
    it("Value(Degree Minute Second) To Longitude [E]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\" E", Units.Longitude, Units.Longitude)).toEqual("21°36'49.47\" E")
    });
    it("Value(Degree Minute Second) To Rumo NE", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\" NE") //4668467635\" NE")
    });
    it("Value(Degree Minute Second) To Rumo SE", () => {
        expect(Format.valueToValue("120°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("59°23'10.53\" SE") //31532365\" SE")
    });
    it("Value(Degree Minute Second) To Rumo SW", () => {
        expect(Format.valueToValue("215°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("35°36'49.47\" SW") //4668467635\" SW")
    });
    it("Value(Degree Minute Second) To Rumo NW", () => {
        expect(Format.valueToValue("300°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("59°23'10.53\" NW") //31532363\" NW")
    });
    it("Value(Rumo)[NE] To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.4668467635\" NE", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("Value(Rumo)[SE] To Degree Minute Second", () => {
        expect(Format.valueToValue("59°23'10.5331532364\" SE", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("120°36'49.47\"") //4668467636\"")
    });
    it("Value(Rumo)[SW] To Degree Minute Second", () => {
        expect(Format.valueToValue("35°36'49.4668467636\" SW", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("215°36'49.47\"") //4668467636\"")
    });
    it("Value(Rumo)[NW] To Degree Minute Second", () => {
        expect(Format.valueToValue("59°23'10.5331532363\" NW", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("300°36'49.47\"") //4668467636\"")
    });
    it("Value(Meters) To Meters", () => {
        expect(Format.valueToValue("1482.518", Units.Meters, Units.Meters)).toEqual("1482.52 m")
    });
    it("Value(Degree) Value To Value(Degree Minute Second)", () => {
        expect(Format.valueToValue("21.61374079077", Units.Degree, Units.DegreeMinuteSecond)).toEqual("21°36'49.47\"")
    });
    it("Value(Degree) Value To Value(Degree Minute Second)", () => {
        expect(Format.valueToValue(21.61374079077, Units.Degree, Units.DegreeMinuteSecond)).toEqual("21°36'49.47\"")
    });
    it("Numeric Value To String(METERS)", () => {
        expect(Format.valueToValue(21.61374079077, Units.Meters, Units.Meters)).toEqual("21.61 m")
    });
    it("Numeric Value To Degree", () => {
        expect(Format.valueToAngle(21.613740790767654, Units.Degree)).toEqual(21.613740790767654)
    });
    it("String Value To Degree", () => {
        expect(Format.valueToAngle("21.61374079077", Units.Degree)).toEqual(21.61374079077)
    });
    it("String Meters To Meters", () => {
        expect(Format.valueToValue("100,555", Units.Meters, Units.Meters)).toEqual("100.56 m")
    });
    it("String Meters To Meters", () => {
        expect(Format.valueToDistance("100,555", Units.Meters)).toEqual(100.555)
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("35 35.35", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("35°35'35.00\"")
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("35.3535", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("35°35'35.00\"")
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("35 3535", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("35°35'35.00\"")
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("00 3535", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("00°35'35.00\"")
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("00 0035", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("00°00'35.00\"")
    });
    it("String Value(D) To String(DMS)", () => {
        expect(Format.valueToValue("00 0000.35", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("00°00'00.35\"")
    });
    it("Change Format pattern", () => {
        const oldFormats = Format.getFormats();
        Format.setFormats({
            degreeFormat: "%.20f",
            degreeMinuteSecondFormat: "%02d°%02d'%02d.%020d\"",
            metersFormat: "%.20f m"
        })
        expect(Format.valueToValue(91.183333, Units.Degree, Units.Degree)).toEqual("91.18333300000000463115")
        expect(Format.valueToValue(91.595999, Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("91°59'59.98999999998043619328\"")
        expect(Format.valueToValue(100.555, Units.Meters, Units.Meters)).toEqual("100.55500000000000682121 m")
        Format.setFormats(oldFormats);
    });
});

/*

35° 35' 35.12345678899480363000"
= 35° + 35'/60 + 35.12345678899480363000"/3600
= 35.59309°

*/