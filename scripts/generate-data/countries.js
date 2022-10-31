const fs = require("fs/promises");

async function getCountryAndCurrencyData(streetViewCountryListCoverage) {
  const countries = await getCountriesInfo(streetViewCountryListCoverage);
  const currencies = await getCurrenciesInfo();
  const usedCurrenciesIDs = getUsedCurrencies(countries);
  const usedCurrencies = usedCurrenciesIDs
    .map((id) => currencies.find((c) => c.id === id))
    .filter(Boolean);

  return {
    countries,
    currencies: usedCurrencies,
  };
}

async function getCountriesInfo(streetViewCountryListCoverage) {
  const query = await fs.readFile(
    "./scripts/generate-data/query-countries.rq",
    {
      encoding: "utf-8",
    }
  );

  const simplifiedResult = await wikidataQuery(query);
  return simplifiedResult.map(
    synthesizeCountryResult(streetViewCountryListCoverage)
  );
}

async function getCurrenciesInfo() {
  const query = await fs.readFile(
    "./scripts/generate-data/query-currencies.rq",
    {
      encoding: "utf-8",
    }
  );

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
      tld: split(raw.tlds)
        .filter(isASCII)
        .filter(
          (tld) =>
            tld.length === 3 && tld !== ".eu" && tld !== ".su" && tld !== ".gb"
        )[0],
      position: parsePosition(raw.position),
      coverage: streetViewCountryListCoverage.includes(name),
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
  return raw.replace(/http:\/\/www.wikidata.org\/entity\//g, "");
}

function split(raw) {
  return raw.split(";").filter(Boolean);
}

function isASCII(str) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

function parsePosition(point) {
  const results = /Point\(([^ ]+) ([^ ]+)\)/.exec(point);

  return results?.slice(1).map((x) => parseFloat(x));
}

module.exports = {
  getCountryAndCurrencyData,
};
