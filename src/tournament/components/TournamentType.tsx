import * as React from 'react';
import { connect } from 'react-redux';
import { disciplineChange, tournamentTypeChange } from '../actions';

const disciplines = [
    'Football',
    'Voleyball',
    'BasketBall',
    'Rugby',
];


export const tournamentTypes = {
    SINGLE_ELIMINATION: 'Single Elimination',
    DOUBLE_ELIMINATION: 'Double Elimination',
    REPECHAGE: 'Repechage',
};

export const tournamentTypesNames = [
    tournamentTypes.SINGLE_ELIMINATION,
    tournamentTypes.DOUBLE_ELIMINATION,
    tournamentTypes.REPECHAGE,
];

interface TournamentTypeProps {
    disciplineChange: (name: string) => string;
    tournamentTypeChange: (name: string) => string;
    type: string;
    discipline: string;
}

export const TournamentType = ({ disciplineChange, tournamentTypeChange, type, discipline}: TournamentTypeProps) => (
    <div style={{ textAlign: 'center' }}>
        <h2>Discipline</h2>
        <Select options={disciplines} onChange={disciplineChange} selected={discipline}/>
        <h2>Tournament type </h2>
        <Select options={tournamentTypesNames} onChange={tournamentTypeChange} selected={type}/>
    </div>
);

export interface SelectProps {
    options: string[];
    selected: string;
    onChange(name: string): void;
}

export interface SelectState {
    active: string;
}

export class Select extends React.Component<SelectProps, SelectState> {
    constructor() {
        super();
        this.state = { active: '' };
    }

    public render() {
        return (
            <div className='select'>
                { this.props.options.map(type =>
                    <div
                        className = {'option ' + this.getClassName(type) }
                        key={type}
                        onClick={() => this.setActive(type) }>{type}</div>
                ) }
            </div>
        );
    }

    public componentDidMount() {
        this.setState({ active: this.props.selected });
    }

    public setActive(active: string) {
        this.setState({ active });
        this.props.onChange(active);
    }

    private getClassName(type: string) {
        return this.state.active === type ? 'active' : '';
    }
}

export default connect(
    state => ({ type: state.tournament.tournamentType, discipline: state.tournament.discipline }),
    { disciplineChange, tournamentTypeChange }
)(TournamentType);
