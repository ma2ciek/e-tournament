import TournamentMembers from './TournamentMembers.tsx';
import TournamentPositions from './TournamentPositions.tsx';
import TournamentType from './TournamentType.tsx';
import { NoMatch } from '../../main/components/NoMatch.tsx';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import Tournament from './Tournament.tsx';
import TournamentHome from './TournamentHome.tsx';
import { TournamentMatches } from './TournamentMatches.tsx';
import { TournamentScores } from './TournamentScores.tsx';

import * as React from 'react';

export const routing = {
    home: '/tournament',
    matches: '/tournament/matches',
    members: '/tournament/members',
    positions: '/tournament/positions',
    scores: '/tournament/scores',
    type: '/tournament/type',
};

export class TournamentRouter extends React.Component<{}, {}> {

    public render() {
        return (
            <Router history={browserHistory}>
                <Redirect from='/tournament/' to='/tournament' />
                <Route path='/tournament/' component={Tournament} >
                    <Route path='type' component={TournamentType} />
                    <Route path='members' component={TournamentMembers} />
                    <Route path='positions' component={TournamentPositions} />
                    <Route path='matches' component={TournamentMatches} />
                    <Route path='scores' component={TournamentScores} />
                    <Route path='*' component={NoMatch} />
                </Route>
                <Route path='/tournament' component={TournamentHome} />
            </Router>
        );
    }
}
