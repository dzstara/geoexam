const fs = require("fs/promises");

function getSparqlQuery(file) {
  return fs.readFile("./scripts/generate-data/queries/" + file + ".rq", {
    encoding: "utf-8",
  });
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

function id(raw) {
  return raw.replace(/http:\/\/www.wikidata.org\/entity\//g, "");
}

function split(raw) {
  return raw.split(";").filter(Boolean);
}

module.exports = {
  getSparqlQuery,
  wikidataQuery,
  id,
  split,
};
