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
    LOAD_TOURNAMENT_DATA,
    CHANGE_TOURNAMENT,
} from './actions';

import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';
import { ITournamentState, IMember } from './model';
import { shuffle } from '../util/common';

const initialState: ITournamentState = {
    stage: 0,
    discipline: null,
    tournamentType: null,
    members: [],
    membersStartPosition: [],
    zoom: 1,
    name: '',
};

export default handleActions<ITournamentState, {}>({
    [LOAD_TOURNAMENT_DATA]: (state: ITournamentState, action: Action<ITournamentState>): ITournamentState => {
        return <ITournamentState>assign({}, state, action.payload);
    },

    [CHANGE_TOURNAMENT]: (state: ITournamentState, action: Action<string>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            name: action.payload,
        });
    },

    [NEXT_STAGE]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            stage: state.stage + 1,
        });
    },

    [PREV_STAGE]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            stage: state.stage - 1,
        });
    },

    [SET_DISCIPLINE]: (state: ITournamentState, action: Action<string>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            discipline: action.payload,
        });
    },

    [SET_TOURNAMENT_TYPE]: (state: ITournamentState, action: Action<string>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            tournamentType: action.payload,
        });
    },

    [ADD_MEMBER]: (state: ITournamentState, action: Action<IMember>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            members: [...state.members, action.payload]
                .sort((m1, m2) => m1.lastName.localeCompare(m2.lastName)),
        });
    },

    [DELETE_MEMBER]: (state: ITournamentState, action: Action<IMember>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            members: state.members
                .filter(m => m !== action.payload)
                .sort((m1, m2) => m1.lastName.localeCompare(m2.lastName)),
        });
    },

    [MEMBER_POSITION_CHANGED]: (state: ITournamentState, action: Action<IMember[]>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            membersStartPosition: action.payload,
        });
    },

    [SHUFFLE_START_POSITION]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            membersStartPosition: shuffle(state.members),
        });
    },

    [RESET_START_POSITION]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            membersStartPosition: new Array(state.members.length),
        });
    },

    [ZOOM_IN]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            zoom: state.zoom * 1.1,
        });
    },

    [ZOOM_OUT]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            zoom: state.zoom / 1.1,
        });
    },

    [ZOOM_RESET]: (state: ITournamentState, action: Action<{}>): ITournamentState => {
        return <ITournamentState>assign({}, state, {
            zoom: 1,
        });
    },

}, initialState);
