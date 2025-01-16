/** A player is a human member of a team. **/
export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    stats?: Stats[];
  }

/** Stats are the individual player statistics compiled from multiple games. **/
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