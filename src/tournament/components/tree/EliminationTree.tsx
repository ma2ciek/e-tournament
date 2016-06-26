// https://css-tricks.com/scale-svg/

import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator';
import { Segment, log } from '../../../util/common';
import { IMember } from '../../model';
import { Action } from 'redux-actions';

export interface EliminationTreeProps {
    members: IMember[];
    membersStartPosition: IMember[];
    memberPositionChanged: (arr: IMember[]) => Action<IMember[]>;
    zoom: number;
}

const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;
const MARGIN = 50;

export class EliminationTree extends React.Component<EliminationTreeProps, {}> {
    protected root = new BinaryNode<TreeData>({
        parent: null,
        data: {
            position: { x: 0, y: 0, width: 0 },
            member: null,
        },
        depth: 0,
    });

    protected nodeList: BinaryNode<TreeData>[] = [this.root];

    public render() {
        console.log(this.props.zoom);
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
            .map(points => SVGCreator.createLineBetweenPoints(points.p1, points.p2))
            .map(line => <path d = {line} key = {Math.random() } strokeWidth = '3' stroke= 'green' />);
    }

    public renderMembers() {
        this.fillGraphWithMembers();
        return this.nodeList.filter(node => !!node.data.member).map(node =>
            <text
                x = {node.data.position.x}
                y = {node.data.position.y - 5}
                key = {node.data.member.id}>
                {node.data.member.firstName + ' ' + node.data.member.lastName}
            </text>
        );
    }

    protected calculateWidth() { return 0; }
    protected createVisualGraph(): Segment[] { return []; }

    protected calculateHeight() { return 0; }
    protected fillGraphWithMembers() { };
}

interface TreeData {
    position: IPosition;
    member: IMember;
}

interface IPosition {
    x: number;
    y: number;
    width: number;
}

export class SingleEliminationTree extends EliminationTree {
    private depth: number;

    public componentWillMount() {
        const members = this.props.members;
        this.depth = Math.ceil(log(2)(members.length));
        this.createBinaryTree();
    }

    private createBinaryTree() {
        this.root.data = {
            position: this.getPosition({ index: 0, invDepth: this.depth }),
            member: null,
        };
        this.addNodes(this.root);
    }

    private addNodes(parent: BinaryNode<TreeData>) {
        if (parent.getDepth() >= this.depth)
            return;

        this.createChild(parent, true);
        this.createChild(parent, false);
    }

    private createChild(parent: BinaryNode<TreeData>, first: boolean) {
        const data = this.getPosition({
            index: parent.getAbsoluteIndex() * 2 + (first ? 0 : 1),
            invDepth: this.depth - parent.getDepth() - 1,
        });
        const child = parent.addChild({ position: data, member: null });
        this.addNodes(child);
        this.nodeList.push(child);
    }

    private getPosition(o: { index: number, invDepth: number }): IPosition {
        return {
            x: o.invDepth * NODE_WIDTH + MARGIN,
            y: (o.index * (1 << (o.invDepth + 1)) + (1 << o.invDepth)) * NODE_HEIGHT + MARGIN,
            width: NODE_WIDTH,
        };
    }

    protected createVisualGraph() {
        return [
            ...this.createHorizontalLine(),
            ...this.createVerticalLines()
        ];
    }

    private createHorizontalLine() {
        return this.nodeList.map(node => ({
            p1: { x: node.data.position.x, y: node.data.position.y },
            p2: { x: node.data.position.x + node.data.position.width, y: node.data.position.y },
        }));
    }

    private createVerticalLines() {
        return this.nodeList
            .filter(node => node.getChildren().length > 0)
            .map(node => {
                const children = node.getChildren();

                const pos1 = children[0].data.position;
                const pos2 = children[1].data.position;

                return {
                    p1: { x: pos1.x + pos1.width, y: pos1.y },
                    p2: { x: pos2.x + pos2.width, y: pos2.y },
                };
            });
    }

    protected fillGraphWithMembers() {
        this.nodeList
            .filter(node => node.getDepth() === this.depth)
            .forEach((node, i) => node.data.member = this.props.membersStartPosition[i]);
    }

    protected calculateWidth() {
        return (this.depth + 1) * NODE_WIDTH + MARGIN * 2;
    }

    protected calculateHeight() {
        return (1 << this.depth) * NODE_HEIGHT * 2 + MARGIN * 2;
    }
}

export class DoubleEliminationTree extends EliminationTree {

}

export class RepechageTree extends EliminationTree {

}
