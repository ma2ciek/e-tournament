import { Router, Redirect, Route, browserHistory, IndexRoute } from 'react-router';
import { Tournament } from './Tournament.tsx';
import { TournamentNew } from './TournamentNew.tsx';
import { TournamentType } from './TournamentType.tsx';
import { NoMatch } from '../NoMatch.tsx';

import * as React from 'react';

export class TournamentRouter extends React.Component<{}, {}> {

    public render() {
        return (
            <Router history={browserHistory}>
                <Route path='/tournament' component={Tournament} >
                    <IndexRoute component={TournamentNew}/>
                    <Route path='type' component={TournamentType} />
                    <Route path='*' component={NoMatch} />
                </Route>
            </Router>
        );
    }
}
