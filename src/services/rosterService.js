const Roster = require("../models/roster");
const { getCurrentSeason } = require("../utils/generic");

exports.updateRoster = async ({ team_id, league_id, externalRoster }) => {
  try {
    if (!team_id || !league_id || !externalRoster) {
      throw new Error(
        `Missing required params for updateRoster: team_id: ${team_id}, league_id: ${league_id}, externalRoster: ${externalRoster}`
      );
    }

    const roster = await Roster.findOne().where("team_id").equals(team_id);

    let updatedRoster;
    if (!roster || roster.length === 0) {
      const newRoster = new Roster({
        team_id: team_id,
        external_roster_id: externalRoster.team.id,
        season: getCurrentSeason(),
        team_name: externalRoster.team.name,
        league_id,
      });
      updatedRoster = await newRoster.save();
    } else {
      roster.team_id = team_id;
      roster.external_roster_id = externalRoster.team.id;
      roster.season = getCurrentSeason();
      roster.team_name = externalRoster.team.name;
      roster.league_id = league_id;
      updatedRoster = await roster.save();
    }

    return updatedRoster;
  } catch (error) {
    throw new Error("Error updating roster: " + error.message);
  }
};
