const axios = require("axios");
const OSError = require("./utils/Error");
const selectServer = require("./utils/selectServer");
const { searchPlayer, searchInfo } = require("./utils/searchPlayer");

module.exports = class OmegaStrikers {

  #_token;
  #_refresh;
  #_instance;

  constructor({ token, refresh }) {
    this.#_token = token;
    this.#_refresh = refresh;

    if (this.#_token == null || this.#_refresh == null) {
      throw new OSError("Token or Refresh invalid.");
    };

    this.#_instance = axios.create({
      method: "get",
      baseURL: "https://prometheus-proxy.odysseyinteractive.gg/api",
      headers: {
        "X-Authorization": `Bearer ${this.#_token}`,
        "X-Refresh-Token": this.#_refresh
      }
    });
  };

  // < Leaderboard > \\
  leaderboard(players, region) {

    if (!players && !region) return "Invalid pages and region.";

    const regions = ["global", "asia", "na", "sa", "eu", "oce"];

    if (parseInt(players) < 1 || parseInt(players) > 10000) return "Minimum players is 10 and Max players is 10000.";
    if (!regions.includes(region.toLowerCase())) return "Invalid server.";

    return this.#_instance(`/v1/ranked/leaderboard/players?startRank=0&pageSize=${players}${selectServer(region)}`)
      .then(response => response.data.players)
      .catch(e => console.log(e));
  };

  // < Search Player By ID >
  async search(playerName) {
    const { data } = await this.#_instance(`/v1/players?usernameQuery=${playerName}`);
    if (data.matches.length == 0) throw new OSError("Player not found.");

    return searchPlayer(playerName, data);
  };

  // < Show Profile (Ranked) >
  async ranked(playerName, region) {

    const regions = ["global", "asia", "na", "sa", "eu", "oce"];
    if (!regions.includes(region.toLowerCase())) return "Invalid server.";

    const playerId = await this.search(playerName);

    try {
      const { data } = await this.#_instance(`/v1/ranked/leaderboard/search/${playerId}?entriesBefore=1&entriesAfter=1&specificRegion=${selectServer(region)}`);
      return searchInfo(playerName, data);
    } catch (e) {
      console.log(e);
      throw new OSError("This player either doesn't have any ranked games or is not among the top 10,000 players.");
    };
  };

  // < Show Account Level >
  async level(playerName) {
    const playerId = await this.search(playerName);

    const { data } = await this.#_instance(`/v1/mastery/${playerId}/player`);
    return data;
  };

  // < Show Profile Mastery Characters >
  async mastery(playerName) {
    const playerId = await this.search(playerName);
    const { data } = await this.#_instance(`/v2/mastery/${playerId}/characters`);
    return data;
  };

};