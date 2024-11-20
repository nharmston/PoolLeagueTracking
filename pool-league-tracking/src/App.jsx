import React, { useState } from 'react'
import grLogo from './assets/GrandRapids.png'
import hLogo from './assets/Hibbing.png'
import './App.css'
import leagueData from "./teams.json";
import './index.css'

const PlayerTable = () => {
  const extractPlayers = (data) => {
    const players = [];

    data.forEach((league) => {
      if (!league.teams || !Array.isArray(league.teams)) return;

      league.teams.forEach((team) => {
        for (const teamName in team) {
          if (!Array.isArray(team[teamName])) continue;

          team[teamName].forEach((player) => {
            if (!player.stats || !Array.isArray(player.stats)) return;

            player.stats.forEach((stat) => {
              players.push({
                name: `${player.firstName} ${player.lastName}`,
                ...stat,
              });
            });
          });
        }
      });
    });

    return players;
  };

  const players = extractPlayers(leagueData);

  return (
    <table>
      <thead>
        <tr>
          {["Name", "Games", "Avg Pts", "Total Pts", "Wins", "Consec", "EOB", "ERO", "10-1"].map(
            (header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#242424",
                  textAlign: "center",
                }}
              >
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index} className="table">
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.name}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.games}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.avgpts}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.totalpts}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.wins}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.consec}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.eob}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.ero}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player["10-1"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const [teamNameInput, setTeamName] = useState("");

  function selectTeam(team) {
    console.log(team);
  }

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
      <div>
        <PlayerTable />
      </div>
    </>
  );
}

export default App;