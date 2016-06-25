import * as React from 'react';
import { Link } from 'react-router';
import { IDictionary } from '../../util/common';

export const style: IDictionary<string> = {
    'display': 'flex',
    'justifyContent': 'center',
};

export const stateStyle: IDictionary<string> = {
    'padding': '5px 10px',
    'margin': '0 5px',
};

export class TournamentMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div style={style} >
                <div class='tournament-type' style={stateStyle}>
                    <Link to='/tournament/type'>Type</Link>
                </div>
                <div class='tournament-members' style={stateStyle}>
                    <Link to='/tournament/members'>Members</Link>
                </div>
                <div class='member-positions' style={stateStyle}>
                    <Link to='/tournament/positions'>Positions</Link>
                </div>
                <div class='tournament-matches' style={stateStyle}>
                    <Link to='/tournament/matches'>Matches</Link>
                </div>
                <div class='tournament-scores' style={stateStyle}>
                    <Link to='/tournament/scores'>Scores</Link>
                </div>
            </div>
        );
    }
}

