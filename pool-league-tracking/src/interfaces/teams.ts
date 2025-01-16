import { Player } from './players'

/** A team consists of 4-8 players, this team belongs to a league. **/
export  interface Team {
    teamName: string;
    division: string;
    players: Player[];
  }