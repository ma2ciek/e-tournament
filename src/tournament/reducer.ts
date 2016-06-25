import { ADD_MEMBER, DELETE_MEMBER, NEXT_STAGE, PREV_STAGE, SET_DISCIPLINE, SET_TOURNAMENT_TYPE } from './actions';
import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import { IState, IMember } from './model';

const initialState: IState = {
    stage: 0,
    discipline: null,
    tournamentType: null,
    members: [],
};

export default handleActions<IState, {}>({
    [NEXT_STAGE]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            stage: state.stage + 1,
        });
    },

    [PREV_STAGE]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            stage: state.stage - 1,
        });
    },

    [SET_DISCIPLINE]: (state: IState, action: Action<string>): IState => {
        return <IState>assign({}, state, {
            discipline: action.payload,
        });
    },

    [SET_TOURNAMENT_TYPE]: (state: IState, action: Action<string>): IState => {
        return <IState>assign({}, state, {
            tournamentType: action.payload,
        });
    },

    [ADD_MEMBER]: (state: IState, action: Action<IMember>): IState => {
        return <IState>assign({}, state, {
            members: [...state.members, action.payload]
                .sort((m1, m2) => m1.lastName.localeCompare(m2.lastName)),
        });
    },

    [DELETE_MEMBER]: (state: IState, action: Action<IMember>): IState => {
        return <IState>assign({}, state, {
            members: state.members
                .filter(m => m !== action.payload)
                .sort((m1, m2) => m1.lastName.localeCompare(m2.lastName)),
        });
    },

}, initialState);
