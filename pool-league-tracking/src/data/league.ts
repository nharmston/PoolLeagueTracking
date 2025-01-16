import { Team } from './teams'

/** A league consists of 6-12 teams. **/
export  interface League {
    leagueID: number;
    name: string;
    teams: Team[];
  }