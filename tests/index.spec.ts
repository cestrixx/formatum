import { Format, Units } from "../src/index";

describe("Format", () => {
    it("Identify Unit : Degree", () => {
        expect(Format.identifyUnit("21")).toEqual(Units.Degree)
    });
    it("Identify Unit : Degree", () => {
        expect(Format.identifyUnit("21.613740790767654")).toEqual(Units.Degree)
    });
    it("Identify Unit : DegreeMinute", () => {
        expect(Format.identifyUnit("21 36.82444744605924")).toEqual(Units.DegreeMinute)
    });
    it("Identify Unit : DegreeMinute", () => {
        expect(Format.identifyUnit("21°36.82444744605924'")).toEqual(Units.DegreeMinute)
    });
    it("Identify Unit : DegreeMinuteSecond", () => {
        expect(Format.identifyUnit("21 36 49.4668467635")).toEqual(Units.DegreeMinuteSecond)
    });
    it("Identify Unit : DegreeMinuteSecond", () => {
        expect(Format.identifyUnit("21°36'49.4668467635\"")).toEqual(Units.DegreeMinuteSecond)
    });
    it("Identify Unit : Rumo NE", () => {
        expect(Format.identifyUnit("21°36'49.4668467635\"NE")).toEqual(Units.Rumo)
    });
    it("Identify Unit : Rumo SE", () => {
        expect(Format.identifyUnit("60'49.4668467635\"SE")).toEqual(Units.Rumo)
    });
    it("Identify Unit : Rumo SW", () => {
        expect(Format.identifyUnit("35°36'49.4668467635\"SW")).toEqual(Units.Rumo)
    });
    it("Identify Unit : Rumo NW", () => {
        expect(Format.identifyUnit("60°36'49.4668467635\"NW")).toEqual(Units.Rumo)
    });

// 0.37723094047149835

    it("String Degree To Degree", () => {
        expect(Format.stringDegreeToDegree("21.613740790767654")).toEqual(21.613740790767654);
    });
    it("String Degree Minute To Degree", () => {
        expect(Format.stringDegreeMinuteToDegree("21°36.82444744605924'")).toEqual(21.613740790767654);
    });
    it("String Degree Minute Second To Degree", () => {
        expect(Format.stringDegreeMinuteSecondToDegree("21°36'49.466846763554315\"")).toEqual(21.613740790767654);
    });
    it("Degree To Degree String", () => {
        expect(Format.degreeToDegreeString(21.613740790767654, "%.10f")).toEqual("21.6137407908")
    });
    it("Degree To Degree Minute String", () => {
        expect(Format.degreeToDegreeMinuteString(21.613740790767654, "%2d°%.10f'")).toEqual("21°36.8244474461'")
    });
    it("Degree To Degree Minute Second String", () => {
        expect(Format.degreeToDegreeMinuteSecondString(21.613740790767654, "%d°%d'%.10f\"")).toEqual("21°36'49.4668467635\"")
    });
    it("String To Radian", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.Radian, "%.10f")).toEqual("0.3772309405")
    });
    it("String To Degree", () => {
        expect(Format.stringToUnit("21", Units.Degree, "%.10f")).toEqual("21.0000000000")
    });
    it("String To Degree", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.Degree, "%.10f")).toEqual("21.6137407908")
    });
    it("String To Degree Minute", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.DegreeMinute, "%2d°%.10f'")).toEqual("21°36.8244474461'")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("21°36'49.4668467635\"")
    });
    it("String To Degree Minute Second [-]", () => {
        expect(Format.stringToUnit("-21°36'49.466846763554315\"", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("-21°36'49.4668467635\"")
    });
    it("String To Degree Minute Second [-]", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"S", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("-21°36'49.4668467635\"")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.stringToUnit("21 36 49.4668467635", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("21°36'49.4668467635\"")
    });
    it("String To Degree Minute Second", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.DegreeMinuteSecond)).toEqual("21°36'49.47\"")
    });
    it("String To Latitude [S]", () => {
        expect(Format.stringToUnit("-21°36'49.466846763554315\"", Units.Latitude)).toEqual("21°36'49.47\" S")
    });
    it("String To Latitude [N]", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.Latitude)).toEqual("21°36'49.47\" N")
    });
    it("String To Longitude [W]", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\" W", Units.Longitude)).toEqual("21°36'49.47\" W")
    });
    it("String To Longitude [E]", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\" E", Units.Longitude)).toEqual("21°36'49.47\" E")
    });
    it("String To Rumo NE", () => {
        expect(Format.stringToUnit("21°36'49.466846763554315\"", Units.Rumo, "%d°%d'%.10f\"")).toEqual("21°36'49.4668467635\" NE")
    });
    it("String To Rumo SE", () => {
        expect(Format.stringToUnit("120°36'49.466846763554315\"", Units.Rumo, "%d°%d'%.10f\"")).toEqual("59°23'10.5331532365\" SE")
    });
    it("String To Rumo SW", () => {
        expect(Format.stringToUnit("215°36'49.466846763554315\"", Units.Rumo, "%d°%d'%.10f\"")).toEqual("35°36'49.4668467635\" SW")
    });
    it("String To Rumo NW", () => {
        expect(Format.stringToUnit("300°36'49.466846763554315\"", Units.Rumo, "%d°%d'%.10f\"")).toEqual("59°23'10.5331532363\" NW")
    });
    it("String[NE] To Degree Minute Second", () => {
        expect(Format.stringToUnit("21°36'49.4668467635\" NE", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("21°36'49.4668467635\"")
    });
    it("String[SE] To Degree Minute Second", () => {
        expect(Format.stringToUnit("59°23'10.5331532364\" SE", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("120°36'49.4668467636\"")
    });
    it("String[SW] To Degree Minute Second", () => {
        expect(Format.stringToUnit("35°36'49.4668467636\" SW", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("215°36'49.4668467636\"")
    });
    it("String[NW] To Degree Minute Second", () => {
        expect(Format.stringToUnit("59°23'10.5331532363\" NW", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")).toEqual("300°36'49.4668467636\"")
    });
    it("String To Meters", () => {
        expect(Format.stringToUnit("1482.518", Units.Meters)).toEqual("1482.52 m")
    });
});