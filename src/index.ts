import {sprintf} from "sprintf-js"

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
    static stringToUnit(value: string, outputUnit: Units, outputFormat: string|null = null): string {
        const inputUnit: Units = this.identifyUnit(value);
        let degreeValue: number;
        switch (inputUnit) {
            case Units.Degree: degreeValue = this.stringDegreeToDegree(value); break;
            case Units.DegreeMinute: degreeValue = this.stringDegreeMinuteToDegree(value); break;
            case Units.DegreeMinuteSecond: degreeValue = this.stringDegreeMinuteSecondToDegree(value); break;
            case Units.Radian: degreeValue = this.stringRadianToDegree(value); break;
            case Units.Rumo: degreeValue = this.stringRumoToDegree(value); break;
            default: degreeValue = 0; break;
        }
        let resultValue: string
        switch (outputUnit) {
            case Units.Degree: resultValue = this.degreeToDegreeString(degreeValue, outputFormat); break;
            case Units.DegreeMinute: resultValue = this.degreeToDegreeMinuteString(degreeValue, outputFormat); break;
            case Units.DegreeMinuteSecond: resultValue = this.degreeToDegreeMinuteSecondString(degreeValue, outputFormat); break;
            case Units.Radian: resultValue = this.degreeToRadianString(degreeValue, outputFormat); break;
            case Units.Rumo: resultValue = this.degreeToRumoString(degreeValue, outputFormat); break;
            case Units.Latitude: resultValue = this.degreeToLatitudeString(degreeValue, outputFormat); break;
            case Units.Longitude: resultValue = this.degreeToLongitudeString(degreeValue, outputFormat); break;
            case Units.Meters: resultValue = this.degreeToMetersString(degreeValue, outputFormat); break;
            default: resultValue = ""; break;
        }

        return resultValue;
    }

    static stringToDegree(value: string): number {
        return parseFloat(this.stringToUnit(value, Units.Degree, "%.11f"));
    }

    static stringRadianToDegree(value: string): number {
        const realValue = value.trim().replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let radian = parseFloat(values[0])
        if (/^-|[WS]$/i.test(value)) radian = -radian;
        return radianToDegree(radian);
    }

    static stringDegreeToDegree(value: string): number {
        const realValue = value.trim().replace(",", ".").replace("°", "").replace(/^-/, '');
        const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseFloat(values[0])
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringDegreeMinuteToDegree(value: string): number {
        const realValue = value.trim().replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1])/1 + parseFloat(values[2])/60;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringDegreeMinuteSecondToDegree(value: string): number {
        const realValue = value.trim().replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null) 
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1])/1 + parseFloat(values[2])/60 + parseFloat(values[3])/3600;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringRumoToDegree(value: string): number {
        const rumoValue = value.trim().replace(/[NSEW]+$/i, '');
        let degreeValue = Number(this.stringToUnit(rumoValue, Units.Degree, "%.17f"));      
        const values = /([NE]{2})?([SE]{2})?([SW]{2})?([NW]{2})?$/i.exec(value);
        const direction = values === null ? "" : values[0];
        switch (direction) {
            case "NE": break; //1° Qd Rumo=Azimute
            case "SE": degreeValue  = 180 - degreeValue; break; //2° Qd Rumo=180-Azimute
            case "SW": degreeValue += 180; break; //3° Qd Rumo=Azimute+180;
            case "NW": degreeValue  = 360 - degreeValue; break; //4 Qd Rumo=360-Azimute;
        }
        return degreeValue;
    }

    static radianFormat = "%.2f"
    static degreeFormat = "%.2f"
    static degreeMinuteFormat = "%2d°%.2f'"
    static degreeMinuteSecondFormat = "%d°%d'%.2f\""
    static rumoFormat = "%d°%d'%.2f\""
    static latlonFormat = "%d°%d'%.2f\" %s"
    static metersFormat = "%.2f m"

    static degreeToRadianString(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.radianFormat;
            return sprintf(format, degreeToRadian(value));
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeString(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.degreeFormat;
            return sprintf(format, value);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeMinuteString(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(value);
            let degrees = Math.floor(decimalDegress);
            if (value < 0) degrees *= -1
            const minutes = ((decimalDegress*60) % 60);
            if (!format) format = this.degreeMinuteFormat;
            return sprintf(format, degrees, minutes);            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeMinuteSecondString(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(value);
            let degrees = Math.floor(decimalDegress);
            if (value < 0) degrees *= -1
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.degreeMinuteSecondFormat;
            return sprintf(format, degrees, minutes, seconds);            
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToRumoString(value: number, format: string|null = null): string {
        const PI = 180;
        const TWOPI = 360;
        const PIOVER2 = 90
        let resultValue = ""
        if (!format) format = this.rumoFormat;
        if (value < 0) {
            value += 2 * PI;
        }
        if (value > PI) {
            if (value > PIOVER2*3) {
                value = TWOPI - value;
                resultValue = this.degreeToDegreeMinuteSecondString(value, format) + " NW";
            } else {
                value -=  PI;
                resultValue = this.degreeToDegreeMinuteSecondString(value, format) + " SW";
            }
        } else {
            if (value > PIOVER2) {
                value = PI - value;
                resultValue = this.degreeToDegreeMinuteSecondString(value, format) + " SE";
            } else {
                resultValue = this.degreeToDegreeMinuteSecondString(value, format) + " NE";
            }
        }
        return resultValue;
    }

    static degreeToLatitudeString(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(value);
            const degrees = Math.floor(decimalDegress);
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "S" : "N";
            return sprintf(format, degrees, minutes, seconds, sign); 
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToLongitudeString(value: number, format: string|null = null): string {
        try {
            const decimalDegress = Math.abs(value);
            const degrees = Math.floor(decimalDegress);
            const minutes = Math.floor((decimalDegress*3600)/60) % 60
            const seconds = (decimalDegress*3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "W" : "E";
            return sprintf(format, degrees, minutes, seconds, sign); 
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToMetersString(value: number, format: string|null = null): string {
        try {
            if (!format) format = this.metersFormat;
            return sprintf(format, value);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static identifyUnit(value: string): Units {
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

function degreeToRadian(degrees: number): number {
    return degrees * Math.PI / 180;
}

function radianToDegree(radians: number): number {
    return radians * 180 / Math.PI;
}
