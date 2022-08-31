import {
    angleToDegrees,
    degreesToDegreeMinuteSecondString,
    degreesToDegreeMinuteString,
    degreesToRumoString,
    degreesToLatitudeString,
    degreesToLongitudeString,
    radianStringToDegrees,
    degreesStringToDegrees,
    degreesToDegreesString,
    degreesToRadianString,
    degreesToMetersString,
} from "./angle"

export enum Units {
    Unknown = 0,
    Radian,
    Degree,
    DegreeMinute,
    DegreeMinuteSecond,
    Rumo,
    Latitude,
    Longitude,
    Meters
}

export class Format {
    static valueToValue(value: string | number, inputUnit: Units, outputUnit: Units, outputFormat: string | null = null) {
        const degree = this.valueToDegree(value, inputUnit);
        return this.degreeToValue(degree, outputUnit, outputFormat);
    }

    static degreeToDegree(value: string | number) {
        return this.valueToDegree(value, Units.Degree);
    }

    static degreeMinuteToDegree(value: string | number) {
        return this.valueToDegree(value, Units.DegreeMinute);
    }

    static degreeMinuteSecondToDegree(value: string | number) {
        return this.valueToDegree(value, Units.DegreeMinuteSecond);
    }

    static valueToDegree(value: string | number, inputUnit: Units) {
        switch (typeof value) {
            case "number": value = value.toString(); break;
            case "string": break;
            default: throw new Error("Tipo de valor invalido!");
        }
        let degrees: number;
        switch (inputUnit) {
            case Units.Degree: degrees = degreesStringToDegrees(value); break;
            case Units.DegreeMinute: degrees = angleToDegrees(value); break;
            case Units.DegreeMinuteSecond: degrees = angleToDegrees(value); break;
            case Units.Radian: degrees = radianStringToDegrees(value); break;
            case Units.Rumo: degrees = angleToDegrees(value); break;
            case Units.Meters: degrees = degreesStringToDegrees(value); break;
            case Units.Latitude: degrees = angleToDegrees(value); break;
            case Units.Longitude: degrees = angleToDegrees(value); break;
            default: degrees = 0; break;
        }
        return degrees;
    }

    static degreeToDegreeString(degrees: number, outputFormat: string | null = null) {
        return this.degreeToValue(degrees, Units.Degree, outputFormat);
    }
    static degreeToDegreeMinuteString(degrees: number, outputFormat: string | null = null) {
        return this.degreeToValue(degrees, Units.DegreeMinute, outputFormat);
    }
    static degreeToDegreeMinuteSecondString(degrees: number, outputFormat: string | null = null) {
        return this.degreeToValue(degrees, Units.DegreeMinuteSecond, outputFormat);
    }

    static degreeToValue(degrees: number, outputUnit: Units, outputFormat: string | null = null): string {
        let value: string
        switch (outputUnit) {
            case Units.Degree: value = degreesToDegreesString(degrees, outputFormat || "%.2f"); break;
            case Units.DegreeMinute: value = degreesToDegreeMinuteString(degrees, outputFormat || "%02d°%02d'"); break;
            case Units.DegreeMinuteSecond: value = degreesToDegreeMinuteSecondString(degrees, outputFormat || "%02d°%02d'%02d.%02d\""); break;
            case Units.Radian: value = degreesToRadianString(degrees, outputFormat || "%.2f"); break;
            case Units.Rumo: value = degreesToRumoString(degrees, outputFormat || "%02d°%02d'%02d.%02d\""); break;
            case Units.Latitude: value = degreesToLatitudeString(degrees, outputFormat || "%02d°%02d'%02d.%02d\""); break;
            case Units.Longitude: value = degreesToLongitudeString(degrees, outputFormat || "%02d°%02d'%02d.%02d\""); break;
            case Units.Meters: value = degreesToMetersString(degrees, outputFormat || "%.2f m"); break;
            default: value = ""; break;
        }
        return value;
    }

    static valueToMetersString(value: string | number, format: string | null = null): string {
        return this.valueToValue(value, Units.Meters, Units.Meters, format || "%.2f");
    }

    static radianFormat = "%.2f"
    static degreeFormat = "%.2f"
    static degreeMinuteFormat = "%02d°%.2f'"
    static degreeMinuteSecondFormat = "%02d°%02d'%02d.%02d\""
    static rumoFormat = "%02d°%02d'%02d.%02d\""
    static latlonFormat = "%02d°%02d'%02d.%02d\" %s"
    static metersFormat = "%.2f m"

    static identifyUnit(value: string): Units {
        value = value.replace(/^\s+|\s+$/gm, '').replace(",", ".");
        let result: Units
        if (value.includes("NE") || value.includes("SE") || value.includes("SW") || value.includes("NW")) {
            result = Units.Rumo;
        } else if (/rad$/i.test(value)) {
            result = Units.Radian;
        } else if (/d$/i.test(value)) {
            result = Units.DegreeMinuteSecond
        } else if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.Degree
        } else if (/^[\+-]?([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.DegreeMinute
        } else if (/^[+-]?([0-9]+)\D+([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.test(value)) {
            result = Units.DegreeMinuteSecond
        } else {
            result = Units.Unknown;
        }
        return result;
    }
}

// console.log(dmsDegrees('353535.35'))
// console.log(dmsDegrees('35 353535'))
// console.log(dmsDegrees('35 35 35.35'))
// console.log(dmsDegrees('3535.35'))
// console.log(dmsDegrees('35 35.35'))
// console.log(dmsDegrees('35 3535'))
// console.log(dmsDegrees('00 3535'))
// console.log(dmsDegrees('00 0035'))    35.123456788994645
// console.log(dmsDegrees('00 0000.35'))
// console.log(dmsDegrees('3535.35'))

// console.log(dm(35.593089849108054, "%02d°%02d.%d'"));
// console.log(degreeToDm(35.593089849108054, "%02d°%02d.%d'"));


// console.log(degreeToDm(35.593089849108054, "%02d°%02d.%d'"));
// console.log(degreeToDms(35.593089849108054, "%02d°%02d'%02d.%d\""));
// console.log(degreeToDms(0.000034293552498557, "%02d°%02d'%02d.%5d\""));


// console.log(Format.stringToUnit("35.353535", Units.Degree));
// console.log(Format.stringToUnit("35.353535", Units.DegreeMinuteSecond));