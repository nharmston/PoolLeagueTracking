import React, { useState } from 'react'
import { League, Team, Player } from './interfaces';
import grLogo from './assets/GrandRapids.png'
import hLogo from './assets/Hibbing.png'
import './App.css'
import leagueData from "./leagueData.json"
import './index.css'


function App() {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [teams, setTeams] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  function extractLeagueNames(leagues: League[]): string[] {
    const leagueNames = leagues.map(({ name }) => name);
    console.log("League Names", leagueNames);
    return leagueNames;
  }

  function findTeamsByLeagueName(leagues: League[], selectLeague: string): string[] {
    const filteredLeagues = leagues.filter((league) => league.name === selectLeague);
    const filteredTeamNames = filteredLeagues.flatMap((league) =>
      league.teams.map(({ teamName }) => teamName)
    );
    console.log("Team Names:", filteredTeamNames);
    return filteredTeamNames;
  }

  function findPlayersByTeamName(leagues: League[], selectedTeam: string): Player[] {
    const filteredLeagues = leagues.filter((league) =>
      league.teams.some((team) => team.teamName === selectedTeam)
    );
    const players = filteredLeagues.flatMap((league) =>
      league.teams
        .filter((team) => team.teamName === selectedTeam)
        .flatMap((team) => team.players)
    );
    console.log("Players:", players);
    return players;
  }

  function findPlayersByLeague(leagues: League[], selectLeague: string) {
    const filteredLeagues = leagues.filter((league) => league.name === selectLeague);
    console.log("Filtering Leagues:", { filteredLeagues })
    const allPlayersInLeague = filteredLeagues.flatMap((leagues) => leagues.teams.flatMap(({ players }) => players));
    return allPlayersInLeague;
  }
  const typedLeagueData = leagueData as League[];
  const testResult = findPlayersByLeague(typedLeagueData, "Grand Rapids");
  console.log("Final result:", testResult);

  const leagueNames = extractLeagueNames(leagueData as League[]);

  return (
    <>
      <h1>Pool League Standings</h1>
      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTeams(findTeamsByLeagueName(leagueData as League[], selectedLeague));
            setPlayers(findPlayersByLeague(leagueData as League[], selectedLeague)); // Add this line
          }}
        >
          <select
            className="rounded p-1 bg-secondary text-white"
            value={selectedLeague}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedLeague(e.target.value)
            }
          >
            <option value="">Select a League</option>
            {leagueNames.map((leagueName: string, index: number) => (
              <option key={index} value={leagueName}>
                {leagueName}
              </option>
            ))}
          </select>

          <input
            className="rounded bg-secondary m-1 p-1 hover:bg-green-100 hover:text-secondary text-slate-400"
            type="submit"
            value="Show Teams"
          />
        </form>
      </div>
      <div className="container">
        <div className="teams-list">
          <button
            className="rounded bg-secondary m-1 p-1 hover:bg-green-100 hover:text-secondary text-slate-400"
            onClick={() => {
              setPlayers(findPlayersByLeague(leagueData as League[], selectedLeague));
            }}
          >
            Show All League Players
          </button>
          <h2>Teams</h2>
          <ul>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <li
                  key={index}
                  onClick={() => setPlayers(findPlayersByTeamName(leagueData as League[], team))}
                >
                  {team}
                </li>
              ))
            ) : (
              <p>No teams found for the selected league.</p>
            )}
          </ul>
        </div>
        <div className="players-table">
          <h2>Players</h2>
          {players.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Games</th>
                  <th>Wins</th>
                  <th>Avg Pts</th>
                  <th>Total Pts</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player: Player, index: number) => (
                  <tr key={index}>
                    <td>{player.firstName} {player.lastName}</td>
                    <td>{player.role}</td>
                    <td>{player.stats?.[0]?.games ?? 0}</td>
                    <td>{player.stats?.[0]?.wins ?? 0}</td>
                    <td>{player.stats?.[0]?.avgpts ?? 0}</td>
                    <td>{player.stats?.[0]?.totalpts ?? 0}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No players available for the selected team.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;