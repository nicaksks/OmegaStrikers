const regions = require("./regions");

module.exports = function selectServer(region) {
  return parameter = region === "global" ? "" : `&specificRegion=${regions[region.toLowerCase()]}`;
};