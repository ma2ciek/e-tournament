import * as React from 'react';
import { Link } from 'react-router';

export class Home extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    public render() {
        return (
            <div class='home'>
                <h1>Tournament platform</h1>
                <Link to='/tournament'>Tournaments</Link>
                <Link to='/players'>Players</Link>
            </div>
        );
    }
}
