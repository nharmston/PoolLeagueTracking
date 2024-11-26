import React, { useState } from 'react'
import grLogo from './assets/GrandRapids.png'
import hLogo from './assets/Hibbing.png'
import './App.css'
import leagueData from "./leagueData.json";
import './index.css'

let leagues = [];
let teams = [];
let players = [];

/*const parsePlayers = (teamPlayers) => {
  return teamPlayers.map(player => {
    const playerData = {
      id: player.id,
      name: `${player.firstName} ${player.lastName}`,
    };
    players.push(playerData);
    return playerData
});
};

const parseTeams = (leagueTeams) => {
  return leagueTeams.map(team => {
    const teamData = {
      teamName: team.teamName,
      players: parsePlayers(team.players),
    };
    teams.push(teamData);
    return teamData;
  });
};

const parseLeague = (leagueData) => {
  return leagueData.map(league => {
    const leagueData = {
      leagueName: league.name,
      teams: parseTeams(league.teams),
    };
    leagues.push(leagueData);
    return leagueData;
  });
};

parseLeague(leagueData);
console.log("Leagues:", leagues);
console.log("Teams:", teams);
console.log("Players:", players);
*/

function extractLeagueNames(leagues) {
  const leagueNames = leagues.map (({ name }) => name);
  console.log("League Names", leagueNames)
  return leagueNames;
}

function findTeamsByLeagueName(leagues, selectLeague) {
  const filteredLeagues = leagues.filter (league => league.name == selectLeague)
  const filteredTeamNames = filteredLeagues.flatMap(league => league.teams.map(({ teamName }) => teamName));
console.log("Team Names:", filteredTeamNames);
return filteredTeamNames;
}

extractLeagueNames(leagueData);

function App() {
  const [leagueNameInput, setLeagueName] = useState("");
  return (
    <>
      <div>
        <a
          href="https://hazelwoodcorp.com/wp-content/uploads/2024/11/grpool-24-1.pdf"
          target="_blank"
        >
          <img src={grLogo} className="logo" alt="Grand Rapids logo" />
        </a>
        <a
          href="https://hazelwoodcorp.com/wp-content/uploads/2024/11/hcpool-24-1.pdf"
          target="_blank"
        >
          <img src={hLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Pool League Standings</h1>
      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(leagueNameInput)
            findTeamsByLeagueName(leagueData, leagueNameInput);
          }}
        >
          <input
            className="rounded p-1 bg-secondary text-white"
            type="text"
            onChange={(e) => {
              setLeagueName(e.target.value);
            }}
            placeholder="Enter League Name"
          />
          <input
            className="rounded bg-secondary m-1 p-1 hover:bg-green-100 hover:text-secondary text-slate-400"
            type="submit"
          />
        </form>
      </div>
      <h2>Player Stats</h2>

    </>
  );
}

export default App;