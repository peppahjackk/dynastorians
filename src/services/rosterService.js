const { getExternalRosters } = require("../utils/generic");
const Roster = require("../models/roster");

exports.updateRoster = async ({ team_id, league_id, externalRoster }) => {
  try {
    const roster = await Roster.find().where("team_id").equals(team_id);
    let updatedRoster;
    if (!roster) {
      const newRoster = new Roster({
        team_id: team_id,
        external_roster_id: externalRoster.team.id,
        season: "2022", // TODO - make this dynamic
        team_name: externalRoster.team.name,
        league_id,
      });
      updatedRoster = await newRoster.save();
    } else {
      roster.team_id = team_id;
      roster.external_roster_id = externalRoster.team.id;
      (roster.season = "2022"), // TODO - make this dynamic
        (roster.team_name = externalRoster.team.name);
      roster.league_id = league_id;
      updatedRoster = await roster.save();
    }

    return updatedRoster;
  } catch (error) {
    throw new Error("Error updating roster: ", error.message);
  }
};

exports.syncRosters = async ({ id, externalLeagueId, externalSystem }) => {
  try {
    const currentRosters = getExternalRosters({
      externalSystem,
      externalLeagueId,
    });

    for (const roster of currentRosters) {
      const rosterResource = await Roster.find()
        .where("league_id")
        .equals(id)
        .where("external_roster_id")
        .equals(roster.team.id);

      if (!rosterResource) {
        const newRoster = new Roster({
          league_id: id,
          external_roster_id: roster.id,
          teamId: roster.teamId,
          teamName: roster.teamName,
          owner: roster.owner,
          players: roster.players,
        });

        await newRoster.save();
      } else {
        rosterResource.teamId = roster.teamId;
        rosterResource.teamName = roster.teamName;
        rosterResource.owner = roster.owner;
        rosterResource.players = roster.players;

        await rosterResource.save();
      }
    }

    const league = await Roster.find().where("leagueId").equals(id);

    return league;
  } catch (error) {
    throw new Error("Error syncing rosters: ", error.message);
  }
};
