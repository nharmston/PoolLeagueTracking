import React, { useState } from 'react'
import grLogo from './assets/GrandRapids.png'
import hLogo from './assets/Hibbing.png'
import './App.css'
import leagueData from "./teams.json";
import './index.css'

let leagues = [];
let teams = [];
let players = [];

const processPlayers = (teamPlayers) => {
  return teamPlayers.map(player => {
    const playerData = {
      id: player.id,
      name: `${player.firstName} ${player.lastName}`,
    };
    players.push(playerData);
    return playerData
});
};

const processTeams = (leagueTeams) => {
  return leagueTeams.map(team => {
    const teamData = {
      teamName: team.teamName,
      players: processPlayers(team.players),
    };
    teams.push(teamData);
    return teamData;
  });
};

const processLeague = (leagueData) => {
  return leagueData.map(league => {
    const leagueData = {
      leagueName: league.name,
      teams: processTeams(league.teams),
    };
    leagues.push(leagueData);
    return leagueData;
  });
};

processLeague(leagueData);
console.log("Leagues:", leagues);
console.log("Teams:", teams);
console.log("Players:", players);

function App() {
  const [teamNameInput, setTeamName] = useState("");

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
            selectTeam(teamNameInput);
          }}
        >
          <input
            className="rounded p-1 bg-secondary text-white"
            type="text"
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            placeholder="Enter Team Name"
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