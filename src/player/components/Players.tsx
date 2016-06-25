import * as React from 'react';

export class Players extends React.Component<{}, {}> {
    public render() {
        return (
            <div className='players'>
                <div className='player-list'>
                    <h3>Players</h3>
                    <div class='list'></div>
                </div>
            </div>
        );
    }
}
