const { getExternalRosters } = require("../utils/generic");
const Team = require("../models/team");
const League = require("../models/league");

// A Team carries extends over several seasons, while a Roster is only for one year
exports.syncTeams = async ({ id, externalLeagueId, externalSystem }) => {
  try {
    console.log('Syncing teams...')
    const { rosters: currentExternalRosters } = await getExternalRosters({
      externalSystem,
      externalLeagueId,
    });

    for (const externalRoster of currentExternalRosters) {
      const { id: teamId } = externalRoster.team;

      const teamInputData = {
        league_id: id,
        external_team_id: teamId,
      };

      let teamResource = await Team.findOne()
        .where("league_id")
        .equals(id)
        .where("external_team_id")
        .equals(externalRoster.team.id);

      if (!teamResource) {
        const newTeam = new Team(teamInputData);
        teamResource = await newTeam.save();
      } else {
        await Team.updateOne({ id: teamId }, teamInputData)
      }
    }

    return;
  } catch (error) {
    throw new Error(`Error syncing teams: ${error.message}`);
  }
};

exports.getTeamByLeagueId = async ({ id }) => {
  try {
    let teams = await Team.find()
      .where("league_id")
      .equals(id)

    return teams;

  } catch (error) {
    throw new Error(`Error fetching teams: ${error.message}`)
  }
}
