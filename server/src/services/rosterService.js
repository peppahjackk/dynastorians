const Roster = require("../models/roster");
const Team = require("../models/team");
const { getCurrentSeason, getExternalRosters } = require("../utils/generic");

const updateRoster = async ({ league_id, externalRoster, season }) => {
  try {
    if (!league_id || !externalRoster || !season) {
      throw new Error(
        `Missing required params for updateRoster: season: ${season}, league_id: ${league_id}, externalRoster: ${externalRoster}`
      );
    }
    console.log(`Updating roster ${externalRoster.team.name} (${externalRoster.team.id}) for season ${season}`)

    let roster = await Roster.findOne({ 'external_roster_id': externalRoster.team.id, season }).exec();
    const teamInternal = await Team.findOne({ league_id, external_team_id: externalRoster.team.id })

    let updatedRoster;
    const rosterPayload = {
      team_id: teamInternal._id,
      external_roster_id: externalRoster.team.id,
      season,
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
      updatedRoster = await roster.set({ ...rosterPayload });
    }

    return updatedRoster;
  } catch (error) {
    throw new Error("Error updating roster: " + error.message);
  }
};

exports.syncRosters = async ({ _id: id, externalLeagueId, externalSystem, firstSeason }) => {
  try {
    console.log('Syncing rosters...')
    if (!externalLeagueId || !externalSystem || !firstSeason || !id) {
      throw new Error(`Missing required params for syncRosters: id: ${id}, firstSeason: ${firstSeason}, externalSystem: ${externalSystem}, external_league_id: ${external_league_id}`
      )
    }
    const currentSeason = getCurrentSeason();
    let seasonInCycle = currentSeason;
    let seasonInCycleNeedsSync = true;

    while (seasonInCycle >= firstSeason && seasonInCycleNeedsSync) {
      const rostersInternal = Roster.find({ seasonInCycle, league_id: id })
      if (rostersInternal.length > 0 && seasonInCycle != currentSeason) {
        seasonInCycleNeedsSync = false;
        return
      }

      const externalLeague = await getExternalRosters({ externalSystem, externalLeagueId, season: seasonInCycle })
      for (const externalRoster of externalLeague.rosters) {
        await updateRoster({ externalRoster, season: seasonInCycle, league_id: id })
      }

      seasonInCycle--;
    }

    return;
  } catch (error) {
    throw new Error("Error syncing rosters: " + error.message);
  }
}

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
