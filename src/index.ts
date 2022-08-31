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
    distanceToMetersString,
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

export interface Formats {
    radianFormat?: string;
    degreeFormat?: string;
    degreeMinuteFormat?: string;
    degreeMinuteSecondFormat?: string;
    rumoFormat?: string;
    latlonFormat?: string;
    metersFormat?: string;
}

export class Format {
    static radianFormat = "%.2f";
    static degreeFormat = "%.2f";
    static degreeMinuteFormat = "%02d°%.2f'";
    static degreeMinuteSecondFormat = "%02d°%02d'%02d.%02d\"";
    static rumoFormat = "%02d°%02d'%02d.%02d\"";
    static latlonFormat = "%02d°%02d'%02d.%02d\"";
    static metersFormat = "%.2f m";

    static setFormats(formats: Formats): void {
        if (formats.radianFormat && formats.radianFormat.length > 0) this.radianFormat = formats.radianFormat;
        if (formats.degreeFormat && formats.degreeFormat.length > 0) this.degreeFormat = formats.degreeFormat;
        if (formats.degreeMinuteFormat && formats.degreeMinuteFormat.length > 0) this.degreeMinuteFormat = formats.degreeMinuteFormat;
        if (formats.degreeMinuteSecondFormat && formats.degreeMinuteSecondFormat.length > 0) this.degreeMinuteSecondFormat = formats.degreeMinuteSecondFormat;
        if (formats.rumoFormat && formats.rumoFormat.length > 0) this.rumoFormat = formats.rumoFormat;
        if (formats.latlonFormat && formats.latlonFormat.length > 0) this.latlonFormat = formats.latlonFormat;
        if (formats.metersFormat && formats.metersFormat.length > 0) this.metersFormat = formats.metersFormat;
    }

    static getFormats(): Formats {
        return {
            radianFormat: Format.radianFormat,
            degreeFormat: Format.degreeFormat,
            degreeMinuteFormat: Format.degreeMinuteFormat,
            degreeMinuteSecondFormat: Format.degreeMinuteSecondFormat,
            rumoFormat: Format.rumoFormat,
            latlonFormat: Format.latlonFormat,
            metersFormat: Format.metersFormat
        };
    }

    static valueToValue(value: string | number, inputUnit: Units, outputUnit: Units, outputFormat: string | null = null): string {
        let resultValue;
        switch (inputUnit) {
            case Units.Degree:
            case Units.Latitude:
            case Units.Longitude:
            case Units.DegreeMinute:
            case Units.DegreeMinuteSecond:
            case Units.Radian:
            case Units.Rumo: resultValue = this.angleToValue(this.valueToAngle(value, inputUnit), outputUnit, outputFormat); break;
            case Units.Meters: resultValue = this.distanceToValue(this.valueToDistance(value, inputUnit), outputUnit, outputFormat); break;
            default: resultValue = "";
        }
        return resultValue;
    }

    static valueToDistance(value: string | number, inputUnit: Units): number {
        switch (typeof value) {
            case "number": value = value.toString(); break;
            case "string": break;
            default: throw new Error("Tipo de valor invalido!");
        }
        let distance;
        switch (inputUnit) {
            case Units.Meters: distance = degreesStringToDegrees(value); break;
            default: throw new Error("Unidade invalida!");
        }
        return distance;
    }

    static valueToAngle(value: string | number, inputUnit: Units): number {
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
            case Units.Meters: degrees = 0; break;
            case Units.Latitude: degrees = angleToDegrees(value); break;
            case Units.Longitude: degrees = angleToDegrees(value); break;
            default: degrees = 0; break;
        }
        return degrees;
    }

    static angleToValue(angle: number, outputUnit: Units, outputFormat: string | null = null): string {
        if (!outputFormat || outputFormat.length <= 0) {
            switch (outputUnit) {
                case Units.Degree: outputFormat = this.degreeFormat; break;
                case Units.DegreeMinute: outputFormat = this.degreeMinuteFormat; break;
                case Units.DegreeMinuteSecond: outputFormat = this.degreeMinuteSecondFormat; break;
                case Units.Radian: outputFormat = this.radianFormat; break;
                case Units.Rumo: outputFormat = this.rumoFormat; break;
                case Units.Meters: outputFormat = this.metersFormat; break;
                case Units.Latitude: outputFormat = this.latlonFormat; break;
                case Units.Longitude: outputFormat = this.latlonFormat; break;
                default: throw new Error("Unidade invalida!");
            }
        }
        let value: string
        switch (outputUnit) {
            case Units.Degree: value = degreesToDegreesString(angle, outputFormat); break;
            case Units.DegreeMinute: value = degreesToDegreeMinuteString(angle, outputFormat); break;
            case Units.DegreeMinuteSecond: value = degreesToDegreeMinuteSecondString(angle, outputFormat); break;
            case Units.Radian: value = degreesToRadianString(angle, outputFormat); break;
            case Units.Rumo: value = degreesToRumoString(angle, outputFormat); break;
            case Units.Latitude: value = degreesToLatitudeString(angle, outputFormat); break;
            case Units.Longitude: value = degreesToLongitudeString(angle, outputFormat); break;
            case Units.Meters: throw new Error("Unidade invalida!");
            default: throw new Error("Unidade invalida!");
        }
        return value;
    }

    static distanceToValue(distance: number, outputUnit: Units, outputFormat: string | null = null): string {
        return distanceToMetersString(outputUnit === Units.Meters ? distance : 0, !outputFormat || outputFormat.length <= 0 ? this.metersFormat : outputFormat);
    }
}