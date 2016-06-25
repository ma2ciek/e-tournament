import * as React from 'react';
import { Home } from './main/components/Home.tsx';
import { NoMatch } from './main/components/NoMatch.tsx';
import { PlayerRouter } from './player/components/PlayerRouter.tsx';
import { Router, Route, IndexRoute } from 'react-router';
import { TournamentRouter } from './tournament/components/TournamentRouter.tsx';

interface AppProps {
    history: ReactRouterRedux.ReactRouterReduxHistory;
}

class App extends React.Component<AppProps, {}> {

    public render() {
        return (
            <Router history={this.props.history}>
                <Route path='/'>
                    <IndexRoute component={Home} />
                    <Route path='home' component={Home}  />
                    <Route path='home/' component={Home} />

                    <Route path='tournament' component={TournamentRouter} />
                    <Route path='tournament/*' component={TournamentRouter} />

                    <Route path='player/*' component={PlayerRouter} />
                    <Route path='players' component={PlayerRouter} />

                    <Route path='*' component={NoMatch} />
                </Route>
            </Router>
        );
    }
}

export default App;
