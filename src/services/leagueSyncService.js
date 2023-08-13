const axios = require('axios'); // you may need to install this with npm install axios

class LeagueSyncService {
  constructor({externalLeagueId, externalSystem}) {
    this.apiClient = axios.create({
      baseURL: 'https://www.fleaflicker.com/api', // replace with your actual API base URL
      timeout: 10000, // optional: sets a timeout of 10 seconds
    });

    this._externalLeagueId = externalLeagueId;
    this._externalSystem = externalSystem
  }

  async fetchLeagueDataFromAPI() {
    try { 
      console.log('Attempting to fetch with league_id param ', this._externalLeagueId)
      const response = await this.apiClient.get(`/FetchLeagueRosters?sport=NFL&league_id=${this._externalLeagueId}`);
      return response.data;
    } catch (err) {
      throw new Error(err)
    }
  }
};


module.exports = LeagueSyncService;