import * as React from 'react';
import IState from '../../main/model';
import { EliminationTree, SingleEliminationTree, DoubleEliminationTree, RepechageTree } from './tree/EliminationTree.tsx';
import { IMember } from '../model';
import { connect } from 'react-redux';
import { memberPositionChanged, shuffleStartPosition, zoomIn, zoomOut, resetZoom, resetStartPosition } from '../actions';
import { tournamentTypes } from './TournamentType.tsx';

interface TournamentPositionsProps {
    members: IMember[];
    type: string;
    shuffleStartPosition: any;
    zoom: number;
    zoomIn: any;
    zoomOut: any;
    resetZoom: any;
    resetStartPosition: any;
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
                    <button onClick={this.props.shuffleStartPosition}>Fill with random players</button>
                    <button onClick={this.props.resetStartPosition}>Remove all players</button>

                    <button onClick={this.props.zoomIn}>+</button>
                    <button onClick={this.props.zoomOut}>-</button>
                    <button onClick={this.props.resetZoom} title='Reset zoom'>Reset</button>
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
    }), { shuffleStartPosition, zoomIn, zoomOut, resetZoom, resetStartPosition }
)(TournamentPositions);
