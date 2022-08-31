import { fmt, getNumberOfElementByFormat } from "./format"

export function dmsStringToDegree(value: string) {
  const { degrees, minutes, seconds } = angleToDms(value);
  return (degrees * 3600 + minutes * 60 + seconds) / 3600;
}

export function dmStringToDegree(value: string) {
  const { degrees, minutes } = angleToDm(value);
  return (degrees * 3600 + minutes * 60) / 3600;
}

export function angleToDegrees(value: string) {
  const isNegative = /^-|[WSO]$/i.test(value);
  const isRumo = value.includes("NE") || value.includes("SE") || value.includes("SW") || value.includes("NW");
  value = value.replace(/^\s+|\s+$/gm, '');
  if (isNegative) value = value.replace(/^-|[WSO]$/i, '');
  if (isRumo) value = value.replace(/[NSEW]+$/i, '');
  let degrees = dmsStringToDegree(value);
  if (isNegative) degrees *= -1;
  const values = /([NE]{2})?([SE]{2})?([SW]{2})?([NW]{2})?$/i.exec(value);
  const direction = values === null ? "" : values[0];
  switch (direction) {
    case "NE": break; //1° Qd Rumo=Azimute
    case "SE": degrees = 180 - degrees; break; //2° Qd Rumo=180-Azimute
    case "SW": degrees += 180; break; //3° Qd Rumo=Azimute+180;
    case "NW": degrees = 360 - degrees; break; //4 Qd Rumo=360-Azimute;
  }
  return degrees;
}

export function degreesToDegreeMinuteSecondString(value: number, format: string) {
  const { degrees, minutes, seconds, milliseconds } = degreesToDms(value, getNumberOfElementByFormat(format, 3));
  return fmt(format, degrees, minutes, seconds, milliseconds);
}

export function degreesToDegreeMinuteString(value: number, format: string) {
  const { degrees, minutes, milliseconds } = degreesToDm(value);
  return fmt(format, degrees, minutes, milliseconds);
}

export function degreesToRumoString(value: number, format: string) {
  const PI = 180;
  const TWOPI = 360;
  const PIOVER2 = 90
  let resultValue = ""
  if (value < 0) {
    value += 2 * PI;
  }
  if (value > PI) {
    if (value > PIOVER2 * 3) {
      value = TWOPI - value;
      resultValue = degreesToDegreeMinuteSecondString(value, format) + " NW";
    } else {
      value -= PI;
      resultValue = degreesToDegreeMinuteSecondString(value, format) + " SW";
    }
  } else {
    if (value > PIOVER2) {
      value = PI - value;
      resultValue = degreesToDegreeMinuteSecondString(value, format) + " SE";
    } else {
      resultValue = degreesToDegreeMinuteSecondString(value, format) + " NE";
    }
  }
  return resultValue;
}

export function degreesToLatitudeString(value: number, format: string) {
  const { degrees, minutes, seconds, milliseconds } = degreesToDms(value);
  const sign = (value < 0) ? "S" : "N";
  return fmt(format, degrees, minutes, seconds, milliseconds) + ` ${sign}`;
}

export function degreesToLongitudeString(value: number, format: string) {
  const { degrees, minutes, seconds, milliseconds } = degreesToDms(value);
  const sign = (value < 0) ? "W" : "E";
  return fmt(format, degrees, minutes, seconds, milliseconds) + ` ${sign}`;
}

export function angleToDms(value: string) {
  let degrees = 0;
  let minutes = 0;
  let seconds = 0;

  const negative = value.indexOf('-') >= 0;
  if (negative) value = value.substring(value.indexOf('-') + 1);
  if (value.indexOf('+') >= 0) value = value.substring(value.indexOf('+') + 1);

  let valid = value.length !== 0;
  if (!valid) return { valid, degrees, minutes, seconds }

  let Sm = 0;
  let Aux = '';

  // procura o primeiro separador
  while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
  if (Sm > 0) {
    if (Sm > 3) Sm = 3;
    Aux = value.substring(0, Sm);
    degrees = parseInt(Aux);
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
    minutes = parseInt(Aux);
    if (minutes > 59) valid = false;
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
    else {
      if (value.length > 2) value = insert(value, 2, '.');
    }
    seconds = parseFloat(value);
    if (seconds >= 60) valid = false;

    const degree = (degrees * 3600 + minutes * 60 + seconds) / 3600;
    valid = degree > 360 ? false : true;
    if (negative) degrees *= -1;
  }

  return { valid, degrees, minutes, seconds };
}

export function angleToDm(value: string) {
  let degrees = 0;
  let minutes = 0;

  const negative = value.indexOf('-') >= 0;
  if (negative) value = value.substring(value.indexOf('-') + 1);
  if (value.indexOf('+') >= 0) value = value.substring(value.indexOf('+') + 1);

  let valid = value.length !== 0;
  if (!valid) return { valid, degrees, minutes }

  let Sm = 0;
  let Aux = '';

  // procura o primeiro separador
  while ((Sm < value.length) && (value[Sm] >= '0' && value[Sm] <= '9')) Sm++;
  if (Sm > 0) {
    if (Sm > 3) Sm = 3;
    Aux = value.substring(0, Sm);
    degrees = parseInt(Aux);
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
    minutes = parseInt(Aux);
    if (minutes > 59) valid = false;
  }

  const degree = (degrees * 3600 + minutes * 60) / 3600;
  valid = degree > 360 ? false : true;
  if (negative) degrees *= -1;

  return { valid, degrees, minutes };
}

export function dmToDegrees(degrees: number, minutes: number) {
  let valid = true;
  const negative = degrees < 0;
  if (negative) degrees *= -1;
  degrees = (degrees * 3600 + minutes * 60) / 3600;
  if (degrees > 360) valid = false;
  if (negative) degrees *= -1;
  return { valid, degrees }
}

export function dmsToDegrees(degrees: number, minutes: number, seconds: number) {
  let valid = true;
  const negative = degrees < 0;
  if (negative) degrees *= -1;
  degrees = (degrees * 3600 + minutes * 60 + seconds) / 3600;
  if (degrees > 360) valid = false;
  if (negative) degrees *= -1;
  return { valid, degrees }
}

export function degreesToDm(value: number) {
  const decimalDegress = Math.abs(value);
  let degrees = Math.floor(decimalDegress);
  if (value < 0) degrees *= -1;
  const minutes = ((decimalDegress * 60) % 60);
  const quotientMinutes = Math.trunc(minutes);
  let remainderMinutes = minutes - quotientMinutes;
  remainderMinutes *= Math.trunc(Math.pow(10, 20));
  return { degrees, minutes: quotientMinutes, milliseconds: remainderMinutes };
}

// export function degreesToDms(value: number) {
//   const decimalDegress = Math.abs(value);
//   let degrees = Math.floor(decimalDegress);
//   if (value < 0) degrees *= -1;
//   const minutes = Math.floor((decimalDegress * 3600) / 60) % 60;
//   const seconds = (decimalDegress * 3600 % 60);
//   const quotientSeconds = Math.trunc(seconds);
//   let remainderSeconds = seconds - quotientSeconds;
//   remainderSeconds *= Math.trunc(Math.pow(10, 20));
//   return { degrees, minutes, seconds: quotientSeconds, milliseconds: remainderSeconds };
// }

export function radianStringToDegrees(value: string): number {
  const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace(/^-/, '');
  const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
  if (values === null)
    throw new Error("Valor invalido!")
  let radian = parseFloat(values[0])
  if (/^-|[WS]$/i.test(value)) radian = -radian;
  return radianToDegrees(radian);
}

export function degreesStringToDegrees(value: string): number {
  const realValue = value.replace(/^\s+|\s+$/gm, '').replace(",", ".").replace("°", "").replace(/^-/, '');
  const values = /^([0-9]+\.?[0-9]*|\.[0-9]+)\D*$/.exec(realValue);
  if (values === null)
    throw new Error("Valor invalido!")
  let degree = parseFloat(values[0])
  if (/^-|[WS]$/i.test(value)) degree = -degree;
  return degree;
}

function degreesToRadian(degrees: number): number {
  return degrees * Math.PI / 180;
}

function radianToDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

export function degreesToRadianString(value: number, format: string): string {
  try {
    return fmt(format, degreesToRadian(value));
  } catch (e) {
    throw new Error("Formato invalido!")
  }
}

export function degreesToDegreesString(value: number, format: string): string {
  try {
    return fmt(format, value);
  } catch (e) {
    throw new Error("Formato invalido!")
  }
}

export function degreesToMetersString(value: number, format: string): string {
  try {
    return fmt(format, value);
  } catch (e) {
    throw new Error("Formato invalido!")
  }
}

export function degreesToDms(degree: number, precision = 20) {
  const negative = degree < 0;
  if (negative) degree *= -1;

  degree *= 3600.0 * Math.pow(10, precision)
  let rest = Math.trunc(degree);
  if ((degree - rest) >= 0.5) rest++;
  const milliseconds = Math.trunc(rest % Math.pow(10, precision));
  rest = Math.trunc(rest / Math.pow(10, precision));
  let y = rest
  const x = 60
  rest = Math.floor(y / x);
  const seconds = y % x;
  y = rest
  let degrees = Math.floor(y / x);
  const minutes = y % x;

  if (negative) degrees *= -1;

  return { degrees, minutes, seconds, milliseconds };
}

// export function degreeToDm(degree: number, precision: number) {
//   let digit = precision - 4;
//   if (digit < 0) digit = 0;

//   const negative = degree < 0;
//   if (negative) degree *= -1;

//   degree *= 3600.0 * Math.pow(10, digit)
//   let rest = Math.trunc(degree);
//   if ((degree - rest) >= 0.5) rest++;
//   const milliseconds = rest % Math.pow(10, digit);
//   rest = Math.trunc(rest / Math.pow(10, digit));
//   let y = rest
//   const x = 60
//   rest = Math.floor(y / x);
//   const seconds = y % x;
//   y = rest
//   let degrees = Math.floor(y / x);
//   const minutes = y % x;

//   if (negative) degrees *= -1;

//   return { degrees, minutes, milliseconds };
// }

function replaceAt(str: string, index: number, value: string) {
  return str.substring(0, index) + value + str.substring(index + value.length);
}

function insert(str: string, index: number, value: string) {
  return str.substring(0, index) + value + str.substring(index, str.length);
}
