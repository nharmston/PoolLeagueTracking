import leagueData from "../leagueData.json";
import { League }  from "../data/league";
import { Player } from "../data/players"
import React from "react";
import '../App.css'

export interface LeagueFormArgs {
    setTeams: (teams: string[]) => void;
    setPlayers: (players: Player[]) => void;
    selectedLeague: string;
    setSelectedLeague: (league: string) => void;
    findPlayersByLeague: (leagues: League[], selectLeague: string) => Player[];
    leagueNames: string[];
    leagueData: League[];
}

export function LeagueForm({setTeams, setPlayers, selectedLeague, setSelectedLeague, findPlayersByLeague, leagueNames, leagueData}: LeagueFormArgs){

    function findTeamsByLeagueName(leagues: League[], selectLeague: string): string[] {
        const filteredLeagues = leagues.filter((league) => league.name === selectLeague);
        const filteredTeamNames = filteredLeagues.flatMap((league) =>
            league.teams.map(({ teamName }) => teamName)
        );
        console.log("Team Names:", filteredTeamNames);
        return filteredTeamNames;
    }


    return (<div className="card">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setTeams(findTeamsByLeagueName(leagueData as League[], selectedLeague));
                setPlayers(findPlayersByLeague(leagueData as League[], selectedLeague));
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
    </div>);
}