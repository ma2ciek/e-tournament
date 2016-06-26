import { createAction } from 'redux-actions';
import { IMember } from './model';

export const NEXT_STAGE = 'NEXT_STAGE';
export const PREV_STAGE = 'PREV_STAGE';
export const SET_DISCIPLINE = 'SET_DISCIPLINE';
export const SET_TOURNAMENT_TYPE = 'SET_TOURNAMENT_TYPE';
export const ADD_MEMBER = 'ADD_MEMBER';
export const DELETE_MEMBER = 'DELETE_MEMBER';
export const MEMBER_POSITION_CHANGED = 'MEMBER_POSITION_CHANGED';
export const SHUFFLE_START_POSITION = 'SHUFFLE_START_POSITION';
export const ZOOM_IN = 'ZOOM_IN';
export const ZOOM_OUT = 'ZOOM_OUT';

export const nextStage = createAction<number>(
    NEXT_STAGE,
    (index: number) => index + 1
);

export const prevStage = createAction<number>(
    PREV_STAGE,
    (index: number) => index - 1
);

export const disciplineChange = createAction<string>(
    SET_DISCIPLINE,
    (name: string) => name
);

export const tournamentTypeChange = createAction<string>(
    SET_TOURNAMENT_TYPE,
    (type: string) => type
);

export const addMember = createAction<IMember>(
    ADD_MEMBER,
    (member: IMember) => member
);

export const deleteMember = createAction<IMember>(
    DELETE_MEMBER,
    (member: IMember) => member
);

export const memberPositionChanged = createAction<IMember[]>(
    MEMBER_POSITION_CHANGED,
    (position: IMember[]) => position
);

export const shuffleStartPosition = createAction<void>(
    SHUFFLE_START_POSITION
);

export const zoomIn = createAction<void>(
    ZOOM_IN
);

export const zoomOut = createAction<void>(
    ZOOM_OUT
);
