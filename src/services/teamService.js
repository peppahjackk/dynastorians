const { getExternalRosters } = require("../utils/generic");
const { updateRoster } = require("./rosterService");
const Team = require("../models/team");

exports.syncTeams = async ({ id, externalLeagueId, externalSystem }) => {
  try {
    const currentExternalRosters = getExternalRosters({
      externalSystem,
      externalLeagueId,
    });

    for (const externalRoster of currentExternalRosters) {
      let teamResource = await Team.find()
        .where("league_id")
        .equals(id)
        .where("external_team_id")
        .equals(externalRoster.team.id);

      if (!teamResource) {
        const newTeam = new Team({
          league_id: id,
          external_team_id: externalRoster.team.id,
        });

        teamResource = await newTeam.save();
      }

      await updateRoster({ team_id: teamResource._id, league_id: id, externalRoster });
    }

    const league = await Roster.find().where("leagueId").equals(id);

    return league;
  } catch (error) {
    throw new Error("Error syncing rosters: ", error.message);
  }
};
