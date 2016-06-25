import {combineReducers } from 'redux';

import player from '../player/reducer';
import tournament from '../tournament/reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    player,
    tournament,
    routing: routerReducer,
});
