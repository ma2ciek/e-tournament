import * as React from 'react';
import {connect} from 'react-redux';
import Storage from '../../storage';
import { changeTournament } from '../actions';
import { push } from 'react-router-redux';

interface TournamentHomeState {
    tournaments: TournamentsStorage;
}

interface TournamentsStorage {
    list: string[];
    current: string;
}

interface TournamentHomeProps {
    changeTournament: any;
    routing: any;
}

export class TournamentHome extends React.Component<TournamentHomeProps, TournamentHomeState> {
    private storage: Storage<TournamentsStorage>;

    public componentWillMount() {
        this.storage = new Storage<TournamentsStorage>('tournaments');
        const tournaments = this.storage.get() || { current: '', list: [] };
        this.setState({ tournaments });
    }

    public render() {
        return (
            <div id='tournament-home'>
                <div>
                    <h2>Create new </h2>
                    <button
                        class='create-new-tournament'
                        onClick={() => this.createNewTournament() }>
                        Create new custom Tournament
                    </button>
                </div>
                <div>
                    <h2>Load existing</h2>
                    { this.state.tournaments.list.map((name, index) =>
                        <div key={index}>
                            <button
                                class='load-tournament'
                                onClick={() => this.loadTournament(name) }>
                                Load {name}
                            </button>
                        </div>
                    ) }
                </div>
            </div>
        );
    }

    private loadTournament(name: string) {
        this.setState({
            tournaments: {
                list: this.state.tournaments.list,
                current: name,
            },
        }, () => {
            this.storage.save(this.state.tournaments);
            this.props.changeTournament(name);
        });
    }

    private createNewTournament() {
        const name = 'abc';
        this.setState({
            tournaments: {
                list: [...this.state.tournaments.list, name],
                current: name,
            },
        }, () => {
            this.storage.save(this.state.tournaments);
            push('/hehehe');
        });
    }

}

export default connect(
    state => ({ routing: state.routing }),
    { changeTournament }
)(TournamentHome);
