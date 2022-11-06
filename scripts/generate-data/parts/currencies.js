const {
  getSparqlQuery,
  wikidataQuery,
  id,
  split,
} = require("../util/wikidata");
const { unique } = require("../util/array");

async function getCurrenciesInfo(countries) {
  const allCurrencies = await fetchCurrencyInfo();
  const usedCurrenciesIDs = getUsedCurrencies(countries);
  return usedCurrenciesIDs
    .map((id) => allCurrencies.find((c) => c.id === id))
    .filter(Boolean);
}

async function fetchCurrencyInfo() {
  const query = await getSparqlQuery("currencies");
  const result = await wikidataQuery(query);

  return result.map(synthesizeCurrencyResult);
}

function getUsedCurrencies(countries) {
  return unique(countries.flatMap((c) => c.currencies));
}

function synthesizeCurrencyResult(raw) {
  return {
    id: id(raw.id),
    name: raw.name,
    symbols: split(raw.symbols),
  };
}

module.exports = {
  getCurrenciesInfo,
};
