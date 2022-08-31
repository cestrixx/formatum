import { Format, Units } from "../src/index";

describe.skip("Format", () => {
    // it("Identify Unit : Degree", () => {
    //     expect(Format.identifyUnit("21")).toEqual(Units.Degree)
    // });
    // it("Identify Unit : Degree", () => {
    //     expect(Format.identifyUnit("21.613740790767654")).toEqual(Units.Degree)
    // });
    // it("Identify Unit : DegreeMinute", () => {
    //     expect(Format.identifyUnit("21 36.82444744605924")).toEqual(Units.DegreeMinute)
    // });
    // it("Identify Unit : DegreeMinute", () => {
    //     expect(Format.identifyUnit("21°36.82444744605924'")).toEqual(Units.DegreeMinute)
    // });
    // it("Identify Unit : DegreeMinuteSecond", () => {
    //     expect(Format.identifyUnit("21 36 49.4668467635")).toEqual(Units.DegreeMinuteSecond)
    // });
    // it("Identify Unit : DegreeMinuteSecond", () => {
    //     expect(Format.identifyUnit("21°36'49.4668467635\"")).toEqual(Units.DegreeMinuteSecond)
    // });
    // it("Identify Unit : Rumo NE", () => {
    //     expect(Format.identifyUnit("21°36'49.4668467635\"NE")).toEqual(Units.Rumo)
    // });
    // it("Identify Unit : Rumo SE", () => {
    //     expect(Format.identifyUnit("60'49.4668467635\"SE")).toEqual(Units.Rumo)
    // });
    // it("Identify Unit : Rumo SW", () => {
    //     expect(Format.identifyUnit("35°36'49.4668467635\"SW")).toEqual(Units.Rumo)
    // });
    // it("Identify Unit : Rumo NW", () => {
    //     expect(Format.identifyUnit("60°36'49.4668467635\"NW")).toEqual(Units.Rumo)
    // });
    it("String Degree To Degree", () => {
        expect(Format.degreeToDegree("21.613740790767654")).toEqual(21.613740790767654);
    });
    it("String Degree Minute To Degree", () => {
        expect(Format.degreeMinuteToDegree("21°36.82444744605924'")).toEqual(21.613740790767654);
    });
    it("String Degree Minute Second To Degree", () => {
        expect(Format.degreeMinuteSecondToDegree("21°36'49.466846763554315\"")).toEqual(21.613740790767654);
    });
    it("Degree To Degree String", () => {
        expect(Format.degreeToValue(21.613740790767654, Units.Degree, "%.10f")).toEqual("21.6137407908")
    });
    it("Degree To Degree Minute String", () => {
        expect(Format.degreeToDegreeMinuteString(21.613740790767654, "%02d°%.10f'")).toEqual("21°36.8244474461'")
    });
    it("Degree To Degree Minute Second String", () => {
        expect(Format.degreeToDegreeMinuteSecondString(21.613740790767654, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("String To Radian", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Radian, "%.10f")).toEqual("0.3772309405")
    });
    it("String To Degree", () => {
        expect(Format.valueToValue("21", Units.Degree, Units.Degree, "%.10f")).toEqual("21.0000000000")
    });
    it("String To Degree", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Degree, "%.10f")).toEqual("21.6137407908")
    });
    it("String To Degree Minute", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinute, Units.DegreeMinute, "%02d°%.10f'")).toEqual("21°36.8244474461'")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("String To Degree Minute Second [-]", () => {
        expect(Format.valueToValue("-21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("-21°36'49.47\"") //4668467635\"")
    });
    it("String To Degree Minute Second [-]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"S", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("-21°36'49.47\"") //4668467635\"")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.valueToValue("21 36 49.4668467635", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.DegreeMinuteSecond)).toEqual("21°36'49.47\"")
    });
    it("String To Latitude [S]", () => {
        expect(Format.valueToValue("-21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Latitude)).toEqual("21°36'49.47\" S")
    });
    it("String To Latitude [N]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Latitude)).toEqual("21°36'49.47\" N")
    });
    it("String To Longitude [W]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\" W", Units.Latitude, Units.Longitude)).toEqual("21°36'49.47\" W")
    });
    it("String To Longitude [E]", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\" E", Units.Longitude, Units.Longitude)).toEqual("21°36'49.47\" E")
    });
    it("String To Rumo NE", () => {
        expect(Format.valueToValue("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\" NE") //4668467635\" NE")
    });
    it("String To Rumo SE", () => {
        expect(Format.valueToValue("120°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("59°23'10.53\" SE") //31532365\" SE")
    });
    it("String To Rumo SW", () => {
        expect(Format.valueToValue("215°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("35°36'49.47\" SW") //4668467635\" SW")
    });
    it("String To Rumo NW", () => {
        expect(Format.valueToValue("300°36'49.466846763554315\"", Units.DegreeMinuteSecond, Units.Rumo, "%02d°%02d'%02d.%02d\"")).toEqual("59°23'10.53\" NW") //31532363\" NW")
    });
    it("String[NE] To Degree Minute Second", () => {
        expect(Format.valueToValue("21°36'49.4668467635\" NE", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("21°36'49.47\"") //4668467635\"")
    });
    it("String[SE] To Degree Minute Second", () => {
        expect(Format.valueToValue("59°23'10.5331532364\" SE", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("120°36'49.47\"") //4668467636\"")
    });
    it("String[SW] To Degree Minute Second", () => {
        expect(Format.valueToValue("35°36'49.4668467636\" SW", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("215°36'49.47\"") //4668467636\"")
    });
    it("String[NW] To Degree Minute Second", () => {
        expect(Format.valueToValue("59°23'10.5331532363\" NW", Units.Rumo, Units.DegreeMinuteSecond, "%02d°%02d'%02d.%02d\"")).toEqual("300°36'49.47\"") //4668467636\"")
    });
    it("String To Meters", () => {
        expect(Format.valueToValue("1482.518", Units.Meters, Units.Meters)).toEqual("1482.52 m")
    });
    it("String Value To String(DMS)", () => {
        expect(Format.valueToValue("21.61374079077", Units.Degree, Units.DegreeMinuteSecond)).toEqual("22°01'37.41\"")
    });
    it("Numeric Value To String(DMS)", () => {
        expect(Format.valueToValue(21.61374079077, Units.Degree, Units.DegreeMinuteSecond)).toEqual("22°01'37.41\"")
    });
    it("String Value To String(METERS)", () => {
        expect(Format.valueToValue("21.61374079077", Units.Degree, Units.Meters)).toEqual("21.61 m")
    });
    it("Numeric Value To String(METERS)", () => {
        expect(Format.valueToValue(21.61374079077, Units.Meters, Units.Meters)).toEqual("21.61 m")
    });
    it("Numeric Value To Degree", () => {
        expect(Format.valueToDegree(21.613740790767654, Units.Degree)).toEqual(21.613740790767654)
    });
    it("String Value To Degree", () => {
        expect(Format.valueToDegree("21.61374079077", Units.Degree)).toEqual(21.61374079077)
    });
    it("String Meters To Meters", () => {
        expect(Format.valueToValue("100,555", Units.Meters, Units.Meters)).toEqual("100.56 m")
    });
    it("String Meters To Meters", () => {
        expect(Format.valueToMetersString("100,555")).toEqual("100.56 m")
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
    // it("String Value(D) To String(DMS)", () => {
    //     //console.log(degreeToDms(dmsDegrees("00 0000.35"), "%02d°%02d'%02d.%d\""));
    //     expect(Format.valueToDegree(-47.7969, Units.DegreeMinuteSecond)).toEqual(-48.33583333333333)
    // });
    // it("String Value(D) To String(DMS)", () => {
    //     //console.log(degreeToDms(dmsDegrees("00 0000.35"), "%02d°%02d'%02d.%d\""));
    //     expect(Format.valueToDegree(-15.7812, Units.DegreeMinuteSecond)).toEqual(-16.303333333333335)
    // });
});

/*

35° 35' 35.12345678899480363000"
= 35° + 35'/60 + 35.12345678899480363000"/3600
= 35.59309°

*/