const fs = require("fs/promises");
const cheerio = require("cheerio");

async function main() {
  const streetViewCountryListCoverage = await getStreetViewCoverage();

  const countries = await getCountriesInfo(streetViewCountryListCoverage);
  const currencies = await getCurrenciesInfo();
  const usedCurrenciesIDs = getUsedCurrencies(countries);
  const usedCurrencies = usedCurrenciesIDs
    .map((id) => currencies.find((c) => c.id === id))
    .filter(Boolean);

  console.log("Number of countries", countries.length);

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
      usedCurrencies.map((c) => `${c.id}="${c.id}"`).join(",") +
      "}\nexport const Currencies: {[key in CurrencyID]: Currency} = {" +
      usedCurrencies
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
            ).replaceAll(/[{}]/g, "")},"currencies":[${currencies
              .map((c) => "CurrencyID." + c)
              .join(",")}] }`
        )
        .join(",") +
      "}",
    { encoding: "utf-8" }
  );
}

async function getCountriesInfo(streetViewCountryListCoverage) {
  const query = await fs.readFile("./scripts/countries.rq", {
    encoding: "utf-8",
  });

  const simplifiedResult = await wikidataQuery(query);
  return simplifiedResult.map(
    synthesizeCountryResult(streetViewCountryListCoverage)
  );
}

async function getCurrenciesInfo() {
  const query = await fs.readFile("./scripts/currencies.rq", {
    encoding: "utf-8",
  });

  const simplifiedResult = await wikidataQuery(query);
  return simplifiedResult.map(synthesizeCurrencyResult);
}

function getUsedCurrencies(countries) {
  return unique(countries.flatMap((c) => c.currencies));
}

function unique(array) {
  return Array.from(new Set(array));
}

async function wikidataQuery(query) {
  console.log("querying...");

  const response = await fetch(
    "https://query.wikidata.org/bigdata/namespace/wdq/sparql?query=" +
      encodeURIComponent(query),
    {
      headers: {
        Accept: "application/sparql-results+json",
      },
    }
  );

  const json = await response.json();

  return json.results.bindings.map(simplifyResult);
}

async function getStreetViewCoverage() {
  const wikipediaResponse = await fetch(
    "https://en.wikipedia.org/wiki/Coverage_of_Google_Street_View"
  );

  const wikipediaHTML = await wikipediaResponse.text();

  const wikipediaHTMLPart = wikipediaHTML
    .split("Current coverage")[2]
    .split("</table>")[0];

  const $ = cheerio.load(wikipediaHTMLPart);

  return $("table td b a")
    .toArray()
    .map((element) => $(element).text());
}

function simplifyResult(raw) {
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, value.value])
  );
}

function synthesizeCountryResult(streetViewCountryListCoverage) {
  return (raw) => {
    let name = raw.name;

    // Workaround for long form name "Kingdom of the Netherlands"
    if (name.includes("Netherlands")) name = "Netherlands";

    return {
      name,
      alpha2: raw.alpha2,
      flag: raw.flag,
      currencies: split(id(raw.currencies)),
      continents: split(raw.continents),
      groups: unique([...split(raw.partOf), ...split(raw.locatedOn)]),
      capitals: split(raw.capitals),
      drivingSide:
        split(raw.drivingSide).filter(
          (v) => v === "right" || v === "left"
        )[0] ?? "right", // default for the Netherlands again...
      phoneCodes: split(raw.phoneCodes),
      tlds: split(raw.tlds)
        .filter(isASCII)
        .filter((tld) => tld.length === 3),
      shape: raw.shape ? split(raw.shape) : [],
      coverage: streetViewCountryListCoverage.includes(raw.name),
    };
  };
}

function synthesizeCurrencyResult(raw) {
  const curr = {
    id: id(raw.id),
    name: raw.name,
    symbols: split(raw.symbols),
  };

  return curr;
}

function id(raw) {
  return raw.replaceAll("http://www.wikidata.org/entity/", "");
}

function split(raw) {
  return raw.split(";").filter(Boolean);
}

function isASCII(str) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

main();
