const { getExternalRosters } = require("../utils/generic");
const Team = require("../models/team");
const League = require("../models/league");

// A Team carries extends over several seasons, while a Roster is only for one year
exports.syncTeams = async ({ id, external_league_id, external_system }) => {
  try {
    console.log('Syncing teams...')
    const { rosters: currentExternalRosters } = await getExternalRosters({
      external_system,
      external_league_id,
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

exports.getTeams = async ({ league_id }) => {
  try {
    let teams = await Team.find({ league_id }).exec()

    return teams;

  } catch (error) {
    throw new Error(`Error fetching teams: ${error.message}`)
  }
}

exports.delete = async ({ league_id, id }) => {
  try {
    let team;
    if (league_id != null) {
      team = await Team.findAndDelete({ league_id });
    }

    if (id != null) {
      team = await Team.findOneAndDelete(id)
    }
    
    return team;
  } catch (error) {
    throw new Error("Error deleting league" + error.message);
  }
}