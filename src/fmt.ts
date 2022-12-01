import { sprintf } from "sprintf-js"

export function fmt(format: string, ...args: any): string {
  const arr = Array.prototype.slice.call(args);
  let i = -1;
  function formatDigits(input: string, totalDigits = input.length) {
    let result = ''
    for (let j = 0; (j < totalDigits && j < input.length); j++) result += input[j];
    return result;
  }
  function callback(exp: any, p0: string, p1: any, p2: any, p3: any, p4: any) {
    if (exp == '%%') return '%';
    if (arr[++i] === undefined) return undefined;
    exp = p2 ? parseInt(p2.substr(1)) : undefined;
    const base = p3 ? parseInt(p3.substr(1)) : undefined;
    let val;
    switch (p4) {
      case 's': val = arr[i]; break;
      case 'c': val = arr[i][0]; break;
      case 'f': val = parseFloat(arr[i]).toFixed(exp); break;
      case 'p': val = parseFloat(arr[i]).toPrecision(exp); break;
      case 'e': val = parseFloat(arr[i]).toExponential(exp); break;
      case 'x': val = parseInt(arr[i]).toString(base ? base : 16); break;
      case 'd': val = parseFloat(parseInt(arr[i], base ? base : 10).toPrecision(exp).toString()).toFixed(0); break;
    }
    val = typeof (val) == 'object' ? JSON.stringify(val) : val.toString(base);
    const sz = parseInt(p1); /* padding size */
    const ch = p1 && p1[0] == '0' ? '0' : ' '; /* isnull? */
    while (val.length < sz) val = p0 !== undefined ? val + ch : ch + val; /* isminus? */
    return val;
  }
  const regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
  return format.replace(regex, callback);
}

export function getNumberOfElementByFormat(format: string, index: number) {
  const regex = /(%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%]))/gm;
  let parts;
  const numberOfElements = [];
  while ((parts = regex.exec(format)) !== null) numberOfElements.push(parts[3]);
  return numberOfElements.length > index ? parseInt(numberOfElements[index]) : 0;
}

export function ff(format: string, ...args: any[]) {
  return sprintf(format, ...args);
}