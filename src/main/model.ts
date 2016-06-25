import playerState from '../player/model';
import tournamentState from '../tournament/model';

interface IState {
    player: playerState;
    routing: any;
    tournament: tournamentState;
}

export default IState;
