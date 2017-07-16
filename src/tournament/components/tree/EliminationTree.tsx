import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator.tsx';
import { Action } from 'redux-actions';
import { IMember } from '../../model';
import { IPosition } from '../../../util/common';
import { Segment } from '../../../util/common';
import NodeMember from './NodeMember.tsx';

export interface EliminationTreeProps {
    members: IMember[];
    membersStartPosition: IMember[];
    memberPositionChanged: (arr: IMember[]) => Action<IMember[]>;
    zoom: number;
}

export interface EliminationTreeState {
    selected?: BinaryNode<TreeData>;
    hovered?: BinaryNode<TreeData>;
}

export interface TreeData {
    position: IPosition;
    member: IMember;
}

export const options = {
    BACKGROUND_COLOR: 'white',
    COLOR: '#09f',
    LINE_WIDTH: 2,
};

export const COLOR = '#09f';
export const LINE_WIDTH = 2;
export const BACKGROUND_COLOR = 'white';

export class EliminationTree extends React.Component<EliminationTreeProps, EliminationTreeState> {
    protected root = new BinaryNode<TreeData>({
        parent: null,
        data: {
            position: { x: 0, y: 0, width: 0, height: 0 },
            member: null,
        },
        depth: 0,
    });

    protected nodeList: BinaryNode<TreeData>[] = [this.root];

    constructor() {
        super();
        this.state = { selected: null, hovered: null };
    }

    public render() {
        return (
            <svg
                viewBox={ 0 + ' ' + 0 + ' ' + this.calculateWidth() + ' ' + this.calculateHeight() }
                width={ this.calculateWidth() * this.props.zoom }
                height={ this.calculateHeight() * this.props.zoom }
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
        return this.nodeList
            .filter(node => node.isEmpty())
            .map((node, index) => (
                <NodeMember
                    node = { node }
                    index = { index }
                    key = { index }
                    replace = { this.replace.bind(this) }
                    selected = { this.state.selected === node }
                    hovered = { this.state.hovered === node }
                    members = { this.props.members }
                    options = { options }
                    onSelect = { n => this.setState({ selected: n }) }
                    onHover = { n => this.setState({ hovered: n }) }
                    />
            ));
    }

    private replace(currentNode: BinaryNode<TreeData>, nextMember: IMember) {
        if (currentNode.data.member === nextMember)
            return;

        const newStartPosition = this.getStartPosition().map((node, index) => {
            if (node.data.member && node.data.member.id && node.data.member.id === nextMember.id)
                return undefined;
            if (index === currentNode.getAbsoluteIndex())
                return nextMember;
            return node.data.member;
        });
        this.props.memberPositionChanged(newStartPosition);
    }

    protected calculateWidth() { return 0; }
    protected createVisualGraph(): Segment[] { return []; }

    protected calculateHeight() { return 0; }
    protected fillGraphWithMembers() { };

    protected getStartPosition() {
        return this.nodeList.filter(node => node.isEmpty());
    }

    public shuffleStartPosition() {

    }
}

export class DoubleEliminationTree extends EliminationTree {

}

export class RepechageTree extends EliminationTree {

}

export { SingleEliminationTree } from './SingleEliminationTree.tsx';
