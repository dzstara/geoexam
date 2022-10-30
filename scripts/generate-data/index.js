const fs = require("fs/promises");
const { getStreetViewCoverage } = require("./street-view");
const { getCountryAndCurrencyData } = require("./countries");

async function main() {
  console.log("Getting Street View coverage info (source: Wikipedia)");

  const streetViewCountryListCoverage = await getStreetViewCoverage();

  console.log("Getting country and currency info (source: Wikidata)");

  const { countries, currencies } = await getCountryAndCurrencyData(
    streetViewCountryListCoverage
  );

  console.log("Number of countries found: ", countries.length);

  await fs.writeFile(
    "./src/generated-data/alpha2.ts",
    "export enum Alpha2 { " +
      countries.map((c) => `${c.alpha2} = "${c.alpha2}"`).join(",") +
      " }",
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    "./src/generated-data/currencies.ts",
    'import { Currency } from "../types";\nexport enum CurrencyID {' +
      currencies.map((c) => `${c.id}="${c.id}"`).join(",") +
      "}\nexport const Currencies: {[key in CurrencyID]: Currency} = {" +
      currencies
        .map(
          (c) =>
            `[CurrencyID.${c.id}]:${JSON.stringify({
              name: c.name,
              symbols: c.symbols,
            })}`
        )
        .join(",") +
      "}",
    { encoding: "utf-8" }
  );

  await fs.writeFile(
    "./src/generated-data/countries.ts",
    `import { Country } from "../types";
import { Alpha2 } from "./alpha2";
import { CurrencyID } from "./currencies";

export const countries: { [key in Alpha2]: Country } = {` +
      countries
        .map(
          ({ alpha2, currencies, ...c }) =>
            `[Alpha2.${alpha2}]:{alpha2:Alpha2.${alpha2}, ${JSON.stringify(
              c
            ).replace(/[{}]/g, "")},"currencies":[${currencies
              .map((c) => "CurrencyID." + c)
              .join(",")}] }`
        )
        .join(",") +
      "}",
    { encoding: "utf-8" }
  );
}

main();
