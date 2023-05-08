function searchPlayer(playerName, data) {
  return data.matches
    .filter(matchs => matchs.username.toLowerCase() === playerName.toLowerCase())
    .map(match => match.playerId)[0]
};

function searchInfo(playerName, data) {
  return data.players
    .filter(players => players.username.toLowerCase() === playerName.toLowerCase())
    .map(player => player)[0];
};

module.exports = {
  searchPlayer,
  searchInfo
};