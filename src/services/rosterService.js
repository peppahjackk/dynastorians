const Roster = require("../models/roster");
const { getCurrentSeason } = require("../utils/generic");

exports.updateRoster = async ({ team_id, league_id, externalRoster }) => {
  try {
    if (!team_id || !league_id || !externalRoster) {
      throw new Error(
        `Missing required params for updateRoster: team_id: ${team_id}, league_id: ${league_id}, externalRoster: ${externalRoster}`
      );
    }

    
    let roster = await Roster.findOne().where("team_id").equals(team_id);

    let updatedRoster;
    const rosterPayload = {
      team_id: team_id,
      external_roster_id: externalRoster.team.id,
      season: getCurrentSeason(),
      team_name: externalRoster.team.name,
      league_id,
      pointsFor: externalRoster.team.pointsFor.value,
      pointsAgainst: externalRoster.team.pointsAgainst.value,
      placement: externalRoster.team.recordOverall.rank,
      wins: externalRoster.team.recordOverall.wins ?? 0,
      losses: externalRoster.team.recordOverall.losses ?? 0,
    }
    
    if (!roster || roster.length === 0) {

      const newRoster = new Roster(rosterPayload);
      updatedRoster = await newRoster.save();
    } else {
      updatedRoster = await roster.set({ ...rosterPayload});
    }

    return updatedRoster;
  } catch (error) {
    throw new Error("Error updating roster: " + error.message);
  }
};

exports.getRosterByLeagueId = async ({ id }) => {
  try {
    let rosters = await Roster.find()
      .where("league_id")
      .equals(id)

    return rosters;

  } catch (error) {
    throw new Error(`Error fetching rosters: ${error.message}`)
  }
}
