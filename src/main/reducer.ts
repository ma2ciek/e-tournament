import player from '../player/reducer';
import tournament from '../tournament/reducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    player,
    tournament,
    routing: routerReducer,
});
