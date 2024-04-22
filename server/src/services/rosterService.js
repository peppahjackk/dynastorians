const Roster = require("../models/roster");
const Team = require("../models/team");
const { getCurrentSeason, getExternalRosters } = require("../utils/generic");

exports.getRosters = async ({ league_id, team_id, season }) => {
  try {
    const searchParams = {};
    if (league_id != null) {
      searchParams.league_id = league_id;
    }
    if (team_id != null) {
      searchParams.team_id = team_id;
    }
    if (season != null) {
      searchParams.season = season;
    }

    let rosters = await Roster.find(searchParams).exec();

    return rosters;
  } catch (error) {
    throw new Error(`Error fetching rosters: ${error.message}`);
  }
};

exports.delete = async ({ league_id, id }) => {
  try {
    let roster;
    if (league_id != null) {
      roster = await Roster.findOneAndDelete({ league_id });
    }

    if (id != null) {
      roster = await Roster.findOneAndDelete(id);
    }

    return roster;
  } catch (error) {
    throw new Error("Error deleting league" + error.message);
  }
};

const updateRoster = async ({ league_id, externalRoster, season }) => {
  try {
    if (!league_id || !externalRoster || !season) {
      throw new Error(
        `Missing required params for updateRoster: season: ${season}, league_id: ${league_id}, externalRoster: ${externalRoster}`,
      );
    }

    let roster = await Roster.findOne({
      external_roster_id: externalRoster.team.id,
      season,
    }).exec();
    const teamInternal = await Team.findOne({
      league_id,
      external_team_id: externalRoster.team.id,
    });

    let updatedRoster;
    const rosterPayload = {
      team_id: teamInternal._id,
      external_roster_id: externalRoster.team.id,
      season,
      team_name: externalRoster.team.name,
      league_id,
      pointsFor: externalRoster.team.pointsFor.value ?? 0,
      pointsAgainst: externalRoster.team.pointsAgainst.value ?? 0,
      placement: externalRoster.team.recordOverall.rank ?? 0,
      wins: externalRoster.team.recordOverall.wins ?? 0,
      losses: externalRoster.team.recordOverall.losses ?? 0,
    };

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

exports.syncRosters = async ({
  _id: id,
  external_league_id,
  external_system,
  first_season,
}) => {
  try {
    console.log("Syncing rosters...");
    if (!external_league_id || !external_system || !first_season || !id) {
      throw new Error(
        `Missing required params for syncRosters: id: ${id}, first_season: ${first_season}, external_system: ${external_system}, external_league_id: ${external_league_id}`,
      );
    }
    const currentSeason = getCurrentSeason();
    let seasonInCycle = currentSeason;
    let seasonInCycleNeedsSync = true;

    while (seasonInCycle >= first_season && seasonInCycleNeedsSync) {
      const rostersInternal = Roster.find({ seasonInCycle, league_id: id });
      if (rostersInternal.length > 0 && seasonInCycle != currentSeason) {
        seasonInCycleNeedsSync = false;
        return;
      }

      const externalLeague = await getExternalRosters({
        external_system,
        external_league_id,
        season: seasonInCycle,
      });
      for (const externalRoster of externalLeague.rosters) {
        await updateRoster({
          externalRoster,
          season: seasonInCycle,
          league_id: id,
        });
      }

      seasonInCycle--;
    }

    return;
  } catch (error) {
    throw new Error("Error syncing rosters: " + error.message);
  }
};

exports.generateStats = (rosters) => {
  const currentSeason = getCurrentSeason();

  const stats = {
    wins: 0,
    losses: 0,
    bestRecord: {
      wins: null,
      losses: null,
      season: null,
      winPct: 0,
    },
  };

  let totalPoints = 0;
  rosters.forEach(({ wins, losses, pointsFor, season }) => {
    stats.wins += wins;
    stats.losses += losses;
    totalPoints += pointsFor;

    const winPct = wins / (wins + losses);

    const seasonComplete = season !== currentSeason || wins + losses === 14;

    if (seasonComplete && winPct > stats.bestRecord.winPct) {
      stats.bestRecord.wins = wins;
      stats.bestRecord.losses = losses;
      stats.bestRecord.season = season;
      stats.bestRecord.winPct = winPct;
    }
  });

  stats.winPct = stats.wins / (stats.wins + stats.losses);
  stats.averagePoints = totalPoints / (stats.wins + stats.losses);

  return stats;
};
