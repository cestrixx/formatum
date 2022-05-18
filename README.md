# formatum

Funções de formatação

Como usar?

```shell
npm install formatum
or
yarn add formatum
```

```ts
import { Format, Units } from "format";

console.log(Format.identifyUnit("21")) // Units.Degree
console.log(Format.identifyUnit("21.613740790767654")) // Units.Degree
console.log(Format.identifyUnit("21 36.82444744605924")) // Units.DegreeMinute
console.log(Format.identifyUnit("21°36.82444744605924'")) // Units.DegreeMinute
console.log(Format.identifyUnit("21 36 49.4668467635")) // Units.DegreeMinuteSecond
console.log(Format.identifyUnit("21°36'49.4668467635\"")) // Units.DegreeMinuteSecond
console.log(Format.identifyUnit("21°36'49.4668467635\"NE")) // Units.Rumo
console.log(Format.identifyUnit("60'49.4668467635\"SE")) // Units.Rumo
console.log(Format.identifyUnit("35°36'49.4668467635\"SW")) // Units.Rumo
console.log(Format.identifyUnit("60°36'49.4668467635\"NW")) // Units.Rumo

console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.Radian)) // 0.3772
console.log(Format.stringToUnit("21", Units.Degree, "%.10f")) // "21.0000000000"
console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.Degree)) // 21.6137
console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.DegreeMinute)) // 21°36.8244'
console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.DegreeMinuteSecond)) // 21°36'49.4668"
console.log(Format.stringToUnit("21 36 49.4668467635", Units.DegreeMinuteSecond)) // 21°36'49.4668"
console.log(Format.stringToUnit("21 36 49.4668467635", Units.DegreeMinuteSecond)) // 21°36'49.4668"
// Rumo
console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.Rumo)) // 21°36'49.4668" NE
console.log(Format.stringToUnit("120°36'49.466846763554315\"", Units.Rumo)) // 59°23'10.5331" SE
console.log(Format.stringToUnit("215°36'49.466846763554315\"", Units.Rumo)) // 35°36'49.4668" SW
console.log(Format.stringToUnit("300°36'49.466846763554315\"", Units.Rumo)) // 59°23'10.5331" NW
console.log(Format.stringToUnit("21°36'49.4668467635\" NE", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")) // 21°36'49.4668467635"
console.log(Format.stringToUnit("59°23'10.5331532364\" SE", Units.DegreeMinuteSecond, "%d %d %.10f")) // 120 36 49.4668467636
console.log(Format.stringToUnit("35°36'49.4668467636\" SW", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")) // 215°36'49.4668467636"
console.log(Format.stringToUnit("59°23'10.5331532363\" NW", Units.DegreeMinuteSecond, "%d°%d'%.10f\"")) // 300°36'49.4668467636"
console.log(Format.stringToUnit("-21°36'49.466846763554315\"", Units.Latitude)) // 21°36'49.4668" S
console.log(Format.stringToUnit("21°36'49.466846763554315\"", Units.Latitude)) // 21°36'49.4668" N
console.log(Format.stringToUnit("21°36'49.466846763554315\" W", Units.Longitude)) // 21°36'49.4668" W
console.log(Format.stringToUnit("21°36'49.466846763554315\" E", Units.Longitude)) // 21°36'49.4668" E
// Distancia
console.log(Format.stringToUnit("1482.518", Units.Meters)) // 1482.52 m
```
