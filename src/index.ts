import { sprintf } from "sprintf-js"

export enum Units {
    Unknown = 0,
    Radian,
    Sexagesimal,
    Degree,
    DegreeMinute,
    DegreeMinuteSecond,
    Rumo,
    Latitude,
    Longitude,
    Meters
}

export class Format {
    static valueToUnit(value: string | number, outputUnit: Units, outputFormat: string | null = null): string {
        switch (typeof value) {
            case "number": value = value.toString(); break;
            case "string": break;
            default: throw new Error("Tipo de valor invalido!");
        }
        return this.stringToUnit(value, outputUnit, outputFormat);
    }

    static stringToUnit(value: string, outputUnit: Units, outputFormat: string | null = null): string {
        let degreeValue: number;
        if (outputUnit === Units.DegreeMinute || outputUnit === Units.DegreeMinuteSecond || outputUnit === Units.Latitude || outputUnit === Units.Longitude || outputUnit === Units.Rumo) {
            degreeValue = this.angleToDegree(value);
        } else {
            const inputUnit: Units = this.identifyUnit(value);
            degreeValue = this.stringToDegree(value, inputUnit);
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

    static valueToDegree(value: string | number, inputUnit: Units): number {
        let outputFormat: string | null;
        switch (inputUnit) {
            case Units.Degree: outputFormat = "%.15f"; break;
            case Units.DegreeMinute: outputFormat = "%02d°%.15f'"; break;
            case Units.DegreeMinuteSecond: outputFormat = "%02d°%02d'%.15f\""; break;
            case Units.Radian: outputFormat = "%.15f"; break;
            case Units.Rumo: outputFormat = "%02d°%02d'%.15f\""; break;
            case Units.Latitude: outputFormat = "%02d°%02d'%.15f\" %s"; break;
            case Units.Longitude: outputFormat = "%02d°%02d'%.15f\" %s"; break;
            case Units.Meters: outputFormat = "%.15f m"; break;
            default: outputFormat = null; break;
        }
        const str: string = this.valueToUnit(value, inputUnit, outputFormat);
        return this.stringToDegree(str, inputUnit);
    }

    static stringToDegree(value: string, inputUnit: Units): number {
        let degreeValue: number;
        switch (inputUnit) {
            case Units.Degree: degreeValue = this.stringDegreeToDegree(value); break;
            case Units.DegreeMinute: degreeValue = this.stringDegreeMinuteToDegree(value); break;
            case Units.DegreeMinuteSecond: degreeValue = this.stringDegreeMinuteSecondToDegree(value); break;
            case Units.Radian: degreeValue = this.stringRadianToDegree(value); break;
            case Units.Rumo: degreeValue = this.stringRumoToDegree(value); break;
            case Units.Meters: degreeValue = this.stringDegreeToDegree(value); break;
            case Units.Latitude: degreeValue = this.stringDegreeMinuteSecondToDegree(value); break;
            case Units.Longitude: degreeValue = this.stringDegreeMinuteSecondToDegree(value); break;
            default: degreeValue = 0; break;
        }
        return degreeValue;
    }

    static angleToDegree(value: string): number {
        let str = value;
        const isNegative = /^-|[WSO]$/i.test(str);
        const isRumo = str.includes("NE") || str.includes("SE") || str.includes("SW") || str.includes("NW");
        str = str.replace(/^\s+|\s+$/gm, '');
        if (isNegative) str = str.replace(/^-|[WSO]$/i, '');
        if (isRumo) str = str.replace(/[NSEW]+$/i, '');
        const data = dmsDms(str);
        if (data) {
            const degrees = data.degrees.toString();
            const minutes = data.minutes.toString();
            const seconds = data.seconds.toString();
            let coordinate = isNegative && !isRumo ? '-' + degrees : degrees;
            if (minutes.length > 0) coordinate += ' ' + minutes;
            if (seconds.length > 0) coordinate += ' ' + seconds;
            if (isRumo) coordinate += ' ' + /([NE]{2})?([SE]{2})?([SW]{2})?([NW]{2})?$/i.exec(value)?.at(0);
            return this.stringToDegree(coordinate, isRumo ? Units.Rumo : Units.DegreeMinuteSecond);

        }
        return 0;
    }

    static stringRadianToDegree(value: string): number {
        const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null)
            throw new Error("Valor invalido!")
        let radian = parseFloat(values[0])
        if (/^-|[WS]$/i.test(value)) radian = -radian;
        return radianToDegree(radian);
    }

    static stringDegreeToDegree(value: string): number {
        const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace("°", "").replace(/^-/, '');
        const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null)
            throw new Error("Valor invalido!")
        let degree = parseFloat(values[0])
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringDegreeMinuteToDegree(value: string): number {
        const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null)
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1]) / 1 + parseFloat(values[2]) / 60;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringDegreeMinuteSecondToDegree(value: string): number {
        const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace(/^-/, '');
        const values = /^([0-9]+)\D+([0-9]+)\D+([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
        if (values === null)
            throw new Error("Valor invalido!")
        let degree = parseInt(values[1]) / 1 + parseFloat(values[2]) / 60 + parseFloat(values[3]) / 3600;
        if (/^-|[WS]$/i.test(value)) degree = -degree;
        return degree;
    }

    static stringRumoToDegree(value: string): number {
        const rumoValue = value.replace(/^\s+|\s+$/gm, '').replace(/[NSEW]+$/i, '');
        let degreeValue = Number(this.stringToUnit(rumoValue, Units.Degree, "%.17f"));
        const values = /([NE]{2})?([SE]{2})?([SW]{2})?([NW]{2})?$/i.exec(value);
        const direction = values === null ? "" : values[0];
        switch (direction) {
            case "NE": break; //1° Qd Rumo=Azimute
            case "SE": degreeValue = 180 - degreeValue; break; //2° Qd Rumo=180-Azimute
            case "SW": degreeValue += 180; break; //3° Qd Rumo=Azimute+180;
            case "NW": degreeValue = 360 - degreeValue; break; //4 Qd Rumo=360-Azimute;
        }
        return degreeValue;
    }

    static radianFormat = "%.2f"
    static degreeFormat = "%.2f"
    static degreeMinuteFormat = "%02d°%.2f'"
    static degreeMinuteSecondFormat = "%02d°%02d'%02d.%02d\""
    static rumoFormat = "%02d°%02d'%02d.%02d\""
    static latlonFormat = "%02d°%02d'%02d.%02d\" %s"
    static metersFormat = "%.2f m"

    static degreeToRadianString(value: number, format: string | null = null): string {
        try {
            if (!format) format = this.radianFormat;
            return sprintf(format, degreeToRadian(value));
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeString(value: number, format: string | null = null): string {
        try {
            if (!format) format = this.degreeFormat;
            return sprintf(format, value);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeMinuteString(value: number, format: string | null = null): string {
        try {
            const decimalDegress = Math.abs(value);
            let degrees = Math.floor(decimalDegress);
            if (value < 0) degrees *= -1
            const minutes = ((decimalDegress * 60) % 60);
            if (!format) format = this.degreeMinuteFormat;
            return sprintf(format, degrees, minutes);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToDegreeMinuteSecondString(value: number, format: string | null = null): string {
        try {
            // const decimalDegress = Math.abs(value);
            // let degrees = Math.floor(decimalDegress);
            // if (value < 0) degrees *= -1
            // const minutes = Math.floor((decimalDegress * 3600) / 60) % 60
            // const seconds = (decimalDegress * 3600 % 60)
            // const quotientSeconds = Math.trunc(seconds);
            // const remainderSeconds = seconds - quotientSeconds;
            if (!format) format = this.degreeMinuteSecondFormat;
            // format = "%02d°%02d'%02d.%d\"";
            // return sprintf(format, degrees, minutes, quotientSeconds, remainderSeconds);
            return degreeToDms(value, format, "");
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToRumoString(value: number, format: string | null = null): string {
        const PI = 180;
        const TWOPI = 360;
        const PIOVER2 = 90
        let resultValue = ""
        if (!format) format = this.rumoFormat;
        if (value < 0) {
            value += 2 * PI;
        }
        if (value > PI) {
            if (value > PIOVER2 * 3) {
                value = TWOPI - value;
                resultValue = this.degreeToDegreeMinuteSecondString(value, format) + " NW";
            } else {
                value -= PI;
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

    static degreeToLatitudeString(value: number, format: string | null = null): string {
        try {
            // const decimalDegress = Math.abs(value);
            // const degrees = Math.floor(decimalDegress);
            // const minutes = Math.floor((decimalDegress * 3600) / 60) % 60
            // const seconds = (decimalDegress * 3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "S" : "N";
            return degreeToDms(value, format, sign);
            // return sprintf(format, degrees, minutes, seconds, sign);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToLongitudeString(value: number, format: string | null = null): string {
        try {
            // const decimalDegress = Math.abs(value);
            // const degrees = Math.floor(decimalDegress);
            // const minutes = Math.floor((decimalDegress * 3600) / 60) % 60
            // const seconds = (decimalDegress * 3600 % 60)
            if (!format) format = this.latlonFormat;
            const sign = (value < 0) ? "W" : "E";
            return degreeToDms(value, format, sign);
            // return sprintf(format, degrees, minutes, seconds, sign);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

    static degreeToMetersString(value: number, format: string | null = null): string {
        try {
            if (!format) format = this.metersFormat;
            return sprintf(format, value);
        } catch (e) {
            throw new Error("Formato invalido!")
        }
    }

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

function degreeToRadian(degrees: number): number {
    return degrees * Math.PI / 180;
}

function radianToDegree(radians: number): number {
    return radians * 180 / Math.PI;
}

function replaceAt(str: string, index: number, value: string) {
    return str.substring(0, index) + value + str.substring(index + value.length);
}

function insert(str: string, index: number, value: string) {
    return str.substring(0, index) + value + str.substring(index, str.length);
}

function dmsDms(str: string) {
    let bValid = true;
    let Sg = 0;
    let Gr = 0, Mi = 0, Sm = 0;
    let Aux = '';
    let value = str;

    const Negative = value.indexOf('-') >= 0;
    if (Negative) value = value.substring(value.indexOf('-') + 1);
    if (value.indexOf('+') >= 0) value = value.substring(value.indexOf('+') + 1);

    if (value.length > 0) {
        // procura o primeiro separador
        while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        if (Sm > 0) {
            if (Sm > 3) Sm = 3;
            Aux = value.substring(0, Sm);
            Gr = parseInt(Aux);
        }
        if ((Sm < value.length) && !(value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        value = value.substring(Sm);

        value = value.replace('"', '');
        if (value.length === 0)
            value += "0"; //PREVINIR CASAS DECIMAIS

        // procura o separador do minuto
        if (value.length > 0) {
            Sm = 0;
            while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
            if (Sm > 2) Sm = 2;
            Aux = value.substring(0, Sm);
            Mi = parseInt(Aux);
            if (Mi > 59) bValid = false;
        }
        if ((Sm < value.length) && !(value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        value = value.substring(Sm)

        // procura o separador do segundo
        if (value.length > 0) {
            Sm = 0;
            while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
            if (Sm < value.length) {
                value = replaceAt(value, Sm, '.');
            }
            else
                if (value.length > 2)
                    value = insert(value, 2, '.');

            Sg = parseFloat(value);
            if (Sg >= 60) bValid = false;
        }
        const degree = (Gr * 3600 + Mi * 60 + Sg) / 3600;
        if (degree > 360) bValid = false;
        if (Negative) Sg *= -1;
        return {
            degrees: Gr,
            minutes: Mi,
            seconds: Sg
        };
    }
    return undefined;
}

export function dmsDegrees(str: string) {
    let bValid = true;
    let Sg = 0;
    let Gr = 0, Mi = 0, Sm = 0;
    let Aux = '';
    let value = str;

    const Negative = value.indexOf('-') >= 0;
    if (Negative) value = value.substring(value.indexOf('-') + 1);
    if (value.indexOf('+') >= 0) value = value.substring(value.indexOf('+') + 1);

    if (value.length > 0) {
        // procura o primeiro separador
        while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        if (Sm > 0) {
            if (Sm > 3) Sm = 3;
            Aux = value.substring(0, Sm);
            Gr = parseInt(Aux);
        }
        if ((Sm < value.length) && !(value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        value = value.substring(Sm);

        value = value.replace('"', '');
        if (value.length === 0)
            value += "0"; //PREVINIR CASAS DECIMAIS

        // procura o separador do minuto
        if (value.length > 0) {
            Sm = 0;
            while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
            if (Sm > 2) Sm = 2;
            Aux = value.substring(0, Sm);
            Mi = parseInt(Aux);
            if (Mi > 59) bValid = false;
        }
        if ((Sm < value.length) && !(value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        value = value.substring(Sm)

        // procura o separador do segundo
        if (value.length > 0) {
            Sm = 0;
            while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
            if (Sm < value.length)
                value = replaceAt(value, Sm, '.');
            else
                if (value.length > 2)
                    value = insert(value, 2, '.');

            Sg = parseFloat(value);
            if (Sg >= 60) bValid = false;
        }
        Sg = (Gr * 3600 + Mi * 60 + Sg) / 3600;
        if (Sg > 360) bValid = false;
        if (Negative) Sg *= -1;
        return Sg;
    }
    return 0;
}

export function dmDegrees(str: string) {
    let bValid = true;
    let Sg = 0;
    let Gr = 0, Mi = 0, Sm = 0;
    let Aux = '';
    let value = str;

    const Negative = value.indexOf('-') >= 0;
    if (Negative) value = value.substring(value.indexOf('-') + 1);
    if (value.indexOf('+') >= 0) value = value.substring(value.indexOf('+') + 1);

    value = value.replace(/^\s+|\s+$/gm, '');
    if (value.length > 0) {
        // procura o primeiro separador
        while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        if (Sm > 0) {
            if (Sm > 3) Sm = 3;
            Aux = value.substring(0, Sm);
            Gr = parseInt(Aux);
        }
        if ((Sm < value.length) && !(value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
        value = value.substring(Sm);

        // procura o separador do minuto
        if (value.length > 0) {
            Sm = 0;
            while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
            if (Sm > 2) Sm = 2;
            Aux = value.substring(0, Sm);
            Mi = parseInt(Aux);
            if (Mi > 59) bValid = false;
        }

        Sg = (Gr * 3600 + Mi * 60) / 3600;
        if (Sg > 360) bValid = false;
        if (Negative) Sg *= -1;
        if (!bValid) return 0;
        return Sg;
    }
    return 0;
}

export function degreeToDms(degree: number, format: string, sign: string) {
    const precision = 20;
    const digit = 2

    const negative = degree < 0;
    if (negative) degree *= -1;

    degree *= 3600.0 * Math.pow(10, digit)
    let rest = Math.trunc(degree);
    if ((degree - rest) >= 0.5) rest++;
    const Mil = rest % Math.pow(10, digit);
    rest = Math.trunc(rest / Math.pow(10, digit));
    let y = rest
    const x = 60
    rest = Math.floor(y / x);
    const Sg = y % x;
    y = rest
    let Gr = Math.floor(y / x);
    const Mi = y % x;

    if (negative && sign.length <= 0) Gr *= -1;

    return sprintf(format, Gr, Mi, Sg, Mil, sign);
}

export function degreeToDm(degree: number, format: string) {
    const precision = 20;
    const digit = 2

    const negative = degree < 0;
    if (negative) degree *= -1;

    degree *= 3600.0 * Math.pow(10, digit)
    let rest = Math.trunc(degree);
    if ((degree - rest) >= 0.5) rest++;
    const Mil = rest % Math.pow(10, digit);
    rest = Math.trunc(rest / Math.pow(10, digit));
    let y = rest
    const x = 60
    rest = Math.floor(y / x);
    const Sg = y % x;
    y = rest
    let Gr = Math.floor(y / x);
    const Mi = y % x;
    const sec = Sg.toString() + "." + Mil.toString();
    const sec2 = parseFloat(sec);
    const arcm = ((sec2 / 360) * 60.0) * Math.pow(10.0, 4);
    const arcm2 = Math.trunc(arcm);

    if (negative) Gr *= -1;

    //const arcminute = parseInt((((sec2 / 360) * 60.0) * Math.pow(10.0, Gr)).toString().replace(".", "")); // 35.585390946483244
    //return sprintf(format, Gr, Mi, arcminute);
    return sprintf(format, Gr, Mi, Mil);
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