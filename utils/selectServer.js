const regions = require("./regions");

module.exports = function selectServer(region) {
  return parameter = region.toLowerCase() === "global" ? "" : `&specificRegion=${regions[region.toLowerCase()]}`;
};
