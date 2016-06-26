export type Stage = number;

export interface IMember {
    firstName: string;
    lastName: string;
    id: number;
}

export interface IState {
    stage: Stage;
    discipline?: string;
    tournamentType?: string;
    members: IMember[];
    membersStartPosition: IMember[];
    zoom: number;
};

export default IState;
