const { formatFFLeagueData } = require("./fleaflicker");

exports.formatLeagueData = ({ leagueData, externalSystem }) => {
  try {
    let formattedData;

    if (externalSystem === "fleaflicker") {
      formattedData = formatFFLeagueData(leagueData);
    }

    return formattedData;
  } catch (err) {
    throw new Error(err);
  }
};
