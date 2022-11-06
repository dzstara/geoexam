const {
  getSparqlQuery,
  wikidataQuery,
  id,
  split,
} = require("../util/wikidata");
const { unique } = require("../util/array");

async function getCountriesInfo(streetViewCountryListCoverage) {
  const query = await getSparqlQuery("countries");
  const result = await wikidataQuery(query);

  return result.map(synthesizeCountryResult(streetViewCountryListCoverage));
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
      languages: split(raw.languages),
    };
  };
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
  getCountriesInfo,
};
