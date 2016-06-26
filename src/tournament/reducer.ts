import {
    SHUFFLE_START_POSITION,
    MEMBER_POSITION_CHANGED,
    ADD_MEMBER, DELETE_MEMBER,
    NEXT_STAGE,
    PREV_STAGE,
    SET_DISCIPLINE,
    SET_TOURNAMENT_TYPE,
    ZOOM_IN,
    ZOOM_OUT,
    ZOOM_RESET,
    RESET_START_POSITION,
} from './actions';

import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import { IState, IMember } from './model';
import { shuffle } from '../util/common';

const initialState: IState = {
    stage: 0,
    discipline: null,
    tournamentType: null,
    members: [],
    membersStartPosition: [],
    zoom: 1,
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

    [MEMBER_POSITION_CHANGED]: (state: IState, action: Action<IMember[]>): IState => {
        return <IState>assign({}, state, {
            membersStartPosition: action.payload,
        });
    },

    [SHUFFLE_START_POSITION]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            membersStartPosition: shuffle(state.members),
        });
    },

    [RESET_START_POSITION]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            membersStartPosition: [],
        });
    },

    [ZOOM_IN]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            zoom: state.zoom * 1.1,
        });
    },

    [ZOOM_OUT]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            zoom: state.zoom / 1.1,
        });
    },

    [ZOOM_RESET]: (state: IState, action: Action<{}>): IState => {
        return <IState>assign({}, state, {
            zoom: 1,
        });
    },

}, initialState);
