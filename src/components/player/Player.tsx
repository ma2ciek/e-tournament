import * as React from 'react';
import { Router, Redirect, Route, browserHistory, IndexRoute } from 'react-router';

interface PlayerProps {
    routeParams: PlayerRouteParams;
}

interface PlayerRouteParams {
    id: number;
}

export class Player extends React.Component<PlayerProps, {}> {
    constructor() {
        super();
    }
    
    public render() {
        return (
            <div>Player id={this.props.routeParams.id}</div>
        );
    }
}
