import * as React from 'react';
import { connect } from 'react-redux';
import { addMember, deleteMember } from '../actions';
import { IMember } from '../model';

interface TournamentMembersProps {
    members: IMember[];
    addMember: Function;
    deleteMember: (member: IMember) => IMember;
}

interface TournamentMembersState {
    firstName?: string;
    lastName?: string;
    id?: string;
}

class TournamentMembers extends React.Component<TournamentMembersProps, TournamentMembersState> {
    public constructor() {
        super();
        this.state = { firstName: '', lastName: '' };
    }

    public render() {
        return (
            <div id='members'>
                <h2>Members</h2>

                <input
                    type='text'
                    placeholder='First name'
                    value={this.state.firstName}
                    onChange = {e => this.setState({ firstName: e.target.value }) } />

                <input
                    type='text'
                    placeholder='Last name'
                    value={this.state.lastName}
                    onChange = {e => this.setState({ lastName: e.target.value }) } />

                <button onClick={() => this.addMember() }>Add member</button>

                <div class='member-list'>
                    { this.props.members.map(member =>
                        <Member key={member.id} data={member} deleteMember={this.props.deleteMember} />
                    ) }
                </div>
            </div>
        );
    }

    public addMember() {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const id = Math.random();

        if (firstName && lastName) {
            this.props.addMember({ firstName, lastName, id });
            this.setState({ firstName: '', lastName: '' });
        }
    }
}

interface MemberProps {
    data: IMember;
    deleteMember(member: IMember): IMember;
}

class Member extends React.Component<MemberProps, {}> {
    public render() {
        return (
            <div className='member'>
                <div className='firstName'>{this.props.data.firstName}</div>
                <div className='lastName'>{this.props.data.lastName}</div>
                <button
                    className='icon del'
                    title='delete'
                    onClick={() => this.props.deleteMember(this.props.data) }>
                    Delete member
                </button>
            </div>
        );
    }
}


export default connect(
    state => ({ members: state.tournament.members }),
    { addMember, deleteMember }
)(TournamentMembers);
