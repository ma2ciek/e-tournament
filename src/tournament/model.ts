export interface IMember {
    firstName: string;
    lastName: string;
    id: number;
}

export interface ITournamentState {
    stage: number;
    discipline?: string;
    tournamentType?: string;
    members: IMember[];
    membersStartPosition: IMember[];
    zoom: number;
    name: string;
};

export default ITournamentState;
