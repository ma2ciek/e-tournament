import * as React from 'react';
import SVGCreator from '../../../util/SVGCreator.tsx';
import { IPosition } from '../../../util/common';

export interface SVGSelectionMenuProps {
    options: Options[];
    position: IPosition;
    mainColor: string;
    secondaryColor: string;
    padding: number;
    onSelect(index: number): void;
}

export interface Options {
    text: string;
}

export interface SVGSelectionMenuState {
    hovered: Options;
}

export class SVGSelectionMenu extends React.Component<SVGSelectionMenuProps, SVGSelectionMenuState> {
    constructor() {
        super();
        this.state = { hovered: null };
    }

    public render() {
        const position = this.props.position;
        const start = {
            x: position.x + position.width * 3 / 2,
            y: position.y - this.props.options.length * position.height / 2,
        };

        return (
            <g>
                <rect
                    x={ position.x + position.width - this.props.padding }
                    y={ position.y - this.props.options.length * position.height / 2 - this.props.padding }
                    width={ position.width + this.props.padding * 2 }
                    height={ position.height * this.props.options.length + this.props.padding * 2}
                    fill={ this.props.mainColor }
                    rx='10'
                    ry='10'
                    />
                { this.props.options.map((option, index) =>
                    <g
                        onClick={ () => { this.props.onSelect(index); this.setState({ hovered: option }) } }
                        onMouseEnter={ () => this.setState({ hovered: option }) }
                        onMouseLeave={ () => this.setState({ hovered: null }) }
                        cursor='pointer'
                        key={ index }>
                        { SVGCreator.createTextInRect({
                            width: position.width,
                            height: position.height,
                            centerX: start.x,
                            centerY: start.y + index * position.height,
                            borderRadius: 0,
                            color: option === this.state.hovered ? this.props.secondaryColor : this.props.mainColor,
                            bg: option === this.state.hovered ? this.props.mainColor : this.props.secondaryColor,
                            text: option.text,
                            borderWidth: 0,
                        }) }
                    </g>
                ) }
            </g>
        );
    }
}
