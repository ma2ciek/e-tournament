import * as React from 'react';
import ITournamentState from '../model';
import Storage from '../../storage';
import {Footer} from '../../main/components/Footer.tsx';
import {TournamentMenu} from './TournamentMenu.tsx';
import {connect} from 'react-redux';
import {loadTournament} from '../actions';

export interface TournamentProps {
    loadTournament: any;
    tournament: ITournamentState;
    routing: any;
}

export class Tournament extends React.Component<TournamentProps, {}> {
    private storage: Storage<ITournamentState>;

    public componentWillMount() {
        this.storage = new Storage<ITournamentState>(this.props.tournament.name);
        const data = this.storage.get();
        this.props.loadTournament(data);
    }

    public componentWillReceiveProps({tournament}) {
        this.storage.save(tournament);
        this.forceUpdate();
    }

    public shouldComponentUpdate({routing}) {
        return routing !== this.props.routing;
    }

    public render() {
        return (
            <div class='main'>
                <TournamentMenu />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default connect(
    state => ({ routing: state.routing, tournament: state.tournament }),
    { loadTournament }
)(Tournament);
