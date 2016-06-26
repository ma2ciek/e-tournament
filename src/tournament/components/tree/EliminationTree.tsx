import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator.tsx';
import { Action } from 'redux-actions';
import { IMember } from '../../model';
import { Segment } from '../../../util/common';

export interface EliminationTreeProps {
    members: IMember[];
    membersStartPosition: IMember[];
    memberPositionChanged: (arr: IMember[]) => Action<IMember[]>;
    zoom: number;
}

export interface TreeData {
    position: IPosition;
    member: IMember;
}

const COLOR = '#09f';
const LINE_WIDTH = 3;
const BACKGROUND_COLOR = 'white';

export class EliminationTree extends React.Component<EliminationTreeProps, {}> {
    protected root = new BinaryNode<TreeData>({
        parent: null,
        data: {
            position: { x: 0, y: 0, width: 0, height: 0 },
            member: null,
        },
        depth: 0,
    });

    protected nodeList: BinaryNode<TreeData>[] = [this.root];

    public render() {
        return (
            <svg
                viewBox={ 0 + ' ' + 0 + ' ' + this.calculateWidth() + ' ' + this.calculateHeight() }
                width = {this.calculateWidth() * this.props.zoom}
                height = {this.calculateHeight() * this.props.zoom}
                preserveAspectRatio='xMidYMid meet'>
                { this.renderLines() }
                { this.renderMembers() }
            </svg>
        );
    }

    public renderLines() {
        return this.createVisualGraph()
            .map(points => SVGCreator.createLineBetweenPoints(points[0], points[1]))
            .map(line => (
                <path
                    d = {line}
                    key = {Math.random() }
                    strokeWidth = {LINE_WIDTH}
                    stroke= {COLOR}
                    />
            ));
    }

    public renderMembers() {
        this.fillGraphWithMembers();
        return this.nodeList.filter(node => !node.getChildren().length).map(node =>
            this.renderMember(node)
        );
    }

    private renderMember(node: BinaryNode<TreeData>) {
        return <g key = { Math.random() } cursor = 'pointer'>
            { SVGCreator.createTextInRect({
                width: node.data.position.width * 3 / 4,
                height: node.data.position.height,
                centerX: node.data.position.x + node.data.position.width / 2,
                centerY: node.data.position.y - node.data.position.height / 2,
                borderRadius: 10,
                color: COLOR,
                bg: BACKGROUND_COLOR,
                text: node.data.member && node.data.member.firstName + ' ' + node.data.member.lastName,
                borderWidth: LINE_WIDTH,
            }) }
        </g>;
    }

    protected calculateWidth() { return 0; }
    protected createVisualGraph(): Segment[] { return []; }

    protected calculateHeight() { return 0; }
    protected fillGraphWithMembers() { };
}


export interface IPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class DoubleEliminationTree extends EliminationTree {

}

export class RepechageTree extends EliminationTree {

}

export { SingleEliminationTree } from './SingleEliminationTree.tsx';
