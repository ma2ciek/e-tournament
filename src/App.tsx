import * as React from 'react';
import { NoMatch } from './components/NoMatch.tsx';
import { Router, Redirect, Route, browserHistory, IndexRoute } from 'react-router';
import { TournamentRouter } from './components/tournament/TournamentRouter.tsx';
import { render} from 'react-dom';
import { PlayerRouter } from './components/player/PlayerRouter.tsx';

export default class App {
    constructor() {
        this.render();
    }

    private render() {
        render((
            <Router history={browserHistory}>
                <Route path='/'>
                    <Route path='tournament' component={TournamentRouter} />
                    <Route path='tournament/*' component={TournamentRouter} />

                    <Route path='player/*' component={PlayerRouter} />
                    <Route path='players' component={PlayerRouter} />

                    <Route path='*' component={NoMatch} />
                </Route>
            </Router>
        ), document.querySelector('main'));
    }
}

window.addEventListener('DOMContentLoaded', () => new App());
