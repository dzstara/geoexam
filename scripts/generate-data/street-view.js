const cheerio = require("cheerio");

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

module.exports = {
  getStreetViewCoverage,
};
