const fs = require("fs/promises");
const { getStreetViewCoverage } = require("./parts/street-view");
const { getCountriesInfo } = require("./parts/countries");
const { getCurrenciesInfo } = require("./parts/currencies");

async function main() {
  console.log("Retrieving Street View coverage info (source: Wikipedia)");

  const streetViewCountryListCoverage = await getStreetViewCoverage();

  console.log("Retrieving country dataset (source: Wikidata)");

  const countries = await getCountriesInfo(streetViewCountryListCoverage);

  console.log("Retrieving currency dataset (source: Wikidata)");

  const currencies = await getCurrenciesInfo(countries);

  console.log("Countries found: ", countries.length);
  console.log("Currencies found:", currencies.length);

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
          ({ alpha2, currencies, languages, ...c }) =>
            `[Alpha2.${alpha2}]:{alpha2:Alpha2.${alpha2}, ${JSON.stringify(
              c
            ).replace(/^{|}$/g, "")},"currencies":[${currencies
              .map((c) => "CurrencyID." + c)
              .join(",")}]}`
        )
        .join(",") +
      "}",
    { encoding: "utf-8" }
  );
}

main();
