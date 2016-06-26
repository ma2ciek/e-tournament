import * as React from 'react';
import { EliminationTree, SingleEliminationTree, DoubleEliminationTree, RepechageTree } from './tree/EliminationTree.tsx';
import { IMember } from '../model';
import { connect } from 'react-redux';
import { tournamentTypes } from './TournamentType.tsx';
import { memberPositionChanged, shuffleStartPosition, zoomIn, zoomOut } from '../actions';
import IState from '../../main/model';

interface TournamentPositionsProps {
    members: IMember[];
    type: string;
    shuffleStartPosition: any;
    zoom: number;
    zoomIn: any;
    zoomOut: any;
}

class TournamentPositions extends React.Component<TournamentPositionsProps, {}> {

    public render() {
        const Tree = connect((state: IState) => ({
            members: state.tournament.members,
            membersStartPosition: state.tournament.membersStartPosition,
            zoom: state.tournament.zoom,
        }), { memberPositionChanged })(this.getEliminationTree());

        return (
            <div id='member-positions'>
                <h2>Positions</h2>
                <div>
                    <button class='fill' onClick={this.props.shuffleStartPosition}>Fill with random players</button>
                    <button onClick={this.props.zoomIn}>Zoom In</button>
                    <button onClick={this.props.zoomOut}>Zoom Out</button>
                    <span>Zoom: {Math.round(this.props.zoom * 100) + '%'}</span>
                </div>
                <Tree />
            </div>
        );
    }

    private getEliminationTree(): typeof EliminationTree {
        switch (this.props.type) {
            case tournamentTypes.SINGLE_ELIMINATION:
                return SingleEliminationTree;
            case tournamentTypes.DOUBLE_ELIMINATION:
                return DoubleEliminationTree;
            case tournamentTypes.REPECHAGE:
                return RepechageTree;
            default:
                throw new Error('missing type');
        }
    }
}

export default connect(
    (state: IState) => ({
        members: state.tournament.members,
        type: state.tournament.tournamentType,
        zoom: state.tournament.zoom,
    }), { shuffleStartPosition, zoomIn, zoomOut }
)(TournamentPositions);

