import * as React from 'react';
import {TournamentMenu} from './TournamentMenu.tsx';
import {Footer} from '../../main/components/Footer.tsx';

export class Tournament extends React.Component<{}, {}> {
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
