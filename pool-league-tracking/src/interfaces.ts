export interface Stats {
    games: number;
    avgpts: number;
    totalpts: number;
    wins: number;
    consec: number;
    eob: number;
    ero: number;
    "10-1": number;
  }
  
export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    role: "Primary" | "Substitute";
    stats: Stats[];
  }
  
export  interface Team {
    teamName: string;
    division: string;
    players: Player[];
  }
  
export  interface League {
    leagueID: number;
    name: string;
    teams: Team[];
  }