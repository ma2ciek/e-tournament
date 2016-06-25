import * as React from 'react';

export class NoMatch extends React.Component<{}, {}> {
    public constructor() {
        super();
    }
    public render() {
        return (
            <div className='_404'>This is not the page you are looking for</div>
        );
    }
}
