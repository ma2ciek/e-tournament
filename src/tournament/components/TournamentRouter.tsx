import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Tournament } from './Tournament.tsx';
import { TournamentNew } from './TournamentNew.tsx';
import TournamentType from './TournamentType.tsx';
import TournamentMembers from './TournamentMembers.tsx';
import TournamentPositions from './TournamentPositions.tsx';
import { TournamentMatches } from './TournamentMatches.tsx';
import { TournamentScores } from './TournamentScores.tsx';

import { NoMatch } from '../../main/components/NoMatch.tsx';

import * as React from 'react';

export class TournamentRouter extends React.Component<{}, {}> {

    public render() {
        return (
            <Router history={browserHistory}>
                <Route path='/tournament' component={Tournament} >
                    <IndexRoute component={TournamentNew}/>
                    <Route path='type' component={TournamentType} />
                    <Route path='members' component={TournamentMembers} />
                    <Route path='positions' component={TournamentPositions} />
                    <Route path='matches' component={TournamentMatches} />
                    <Route path='scores' component={TournamentScores} />
                    <Route path='*' component={NoMatch} />
                </Route>
            </Router>
        );
    }
}
