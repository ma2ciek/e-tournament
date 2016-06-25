import { handleActions } from 'redux-actions';

interface IPlayerState {
    players: IPlayer[];
}

interface IPlayer {
    //
}

const initialState: IPlayerState = {
    players: [],
};

export default handleActions<{}, {}>({
    //
}, initialState);
