import * as React from 'react';
import { EliminationTree, SingleEliminationTree, DoubleEliminationTree, RepechageTree } from './tree/EliminationTree.tsx';
import { IMember } from '../model';
import { connect } from 'react-redux';
import { tournamentTypes } from './TournamentType.tsx';
import { } from '../actions';

interface TournamentPositionsProps {
    members: IMember[];
    type: string;
}

class TournamentPositions extends React.Component<TournamentPositionsProps, {}> {
    public constructor() {
        super();
    }
    public render() {
        const Tree = this.getEliminationTree();
        return (
            <div id='member-positions'>
                <h2>Positions</h2>
                <Tree members = {this.props.members}/>
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
    state => ({ members: state.tournament.members, type: state.tournament.tournamentType })
)(TournamentPositions);

