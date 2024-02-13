const { getExternalRosters } = require("../utils/generic");
const Team = require("../models/team");
const League = require("../models/league");

// A Team carries extends over several seasons, while a Roster is only for one year
exports.syncTeams = async ({ league, manager }) => {
  try {
    const { id: league_id, external_league_id, external_system } = league;
    const { id: manager_id, external_owned_team_id } = manager;

    if (!external_league_id) {
      throw new Error("External league id is required");
    }
    if (!external_system) {
      throw new Error("External system is required");
    }

    const { rosters: currentExternalRosters } = await getExternalRosters({
      external_system,
      external_league_id,
    });

    for (const externalRoster of currentExternalRosters) {
      const { id: teamId } = externalRoster.team;

      const teamInputData = {
        league_id,
        external_team_id: teamId,
        manager_id: teamId === external_owned_team_id ? manager_id : null,
      };

      let teamResource = await Team.findOne()
        .where("league_id")
        .equals(league_id)
        .where("external_team_id")
        .equals(externalRoster.team.id);

      if (!teamResource) {
        const newTeam = new Team(teamInputData);
        teamResource = await newTeam.save();
      } else {
        await Team.updateOne({ id: teamId }, teamInputData);
      }
    }

    return;
  } catch (error) {
    throw new Error(`Error syncing teams: ${error.message}`);
  }
};

exports.getTeam = async ({ league_id, manager_id }) => {
  try {
    const filter = {};
    if (league_id) {
      filter.league_id = league_id;
    }
    if (manager_id) {
      filter.manager_id = manager_id;
    }
    const team = await Team.find(filter).exec();

    return team;
  } catch (error) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

exports.getTeams = async ({ league_id, manager_id }) => {
  try {
    const teams = [];

    if (league_id != null) {
      const teamsByLeague = await Team.find({ league_id });
      teams.push(...teamsByLeague);
    }

    if (manager_id != null) {
      const teamsByManager = await Team.find()
        .where("manager_id")
        .equals(manager_id);
      teams.push(...teamsByManager);
    }

    return teams;
  } catch (error) {
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

exports.delete = async ({ league_id, id }) => {
  try {
    let team;
    if (league_id != null) {
      team = await Team.deleteMany({ league_id });
    }

    if (id != null) {
      team = await Team.findOneAndDelete(id);
    }

    return team;
  } catch (error) {
    throw new Error("Error deleting league" + error.message);
  }
};

exports.updateTeam = async ({ id, external_team_id, data }) => {
  try {
    const team = await Team.findOneAndUpdate({ id, external_team_id }, data, {
      new: true,
    });
    return team;
  } catch (error) {
    throw new Error("Error updating team" + error.message);
  }
};
