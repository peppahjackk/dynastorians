exports.getExternalRosters = async ({ externalSystem, id }) => {
  try {
    let externalLeague;
    if (externalSystem === "fleaflicker") {
      externalLeague = await getRostersFromFF(id);
    }

    return externalLeague;
  } catch (error) {
    throw new Error("Error getting user from external system" + error.message);
  }
};
