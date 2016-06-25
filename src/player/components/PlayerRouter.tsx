import * as React from 'react';
import { Router, Redirect, Route, browserHistory, IndexRoute } from 'react-router';
import {Player} from './Player.tsx';
import {Players} from './Players.tsx';

export class PlayerRouter extends React.Component<{}, {}> {
    public render() {
        return (
            <Router history={browserHistory}>
                <Route path='/players' component={Players} />
                <Route path='/player/:id' component={Player} />
            </Router>
        );
    }
}
