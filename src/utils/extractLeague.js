exports.formatLeagueData = ({ leagueData, externalSystem }) => {
  try {
    let formattedData;

    if (externalSystem === "fleaflicker") {
      formattedData = formatFleaflickerData(leagueData);
    }

    return formattedData;
  } catch (err) {
    throw new Error(err);
  }
};

const formatFleaflickerData = (leagueData) => {
  const { id, name, sport } = leagueData;

  return {
    id, name, sport
  }
};
