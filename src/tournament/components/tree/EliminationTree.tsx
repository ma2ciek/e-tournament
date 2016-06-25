import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator';
import { shuffle, Segment, log } from '../../../util/common';
import { IMember } from '../../model';

export interface EliminationTreeProps {
    members: IMember[];
}

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

    protected segments: Segment[] = [];

    public render() {
        return (
            <svg
                width={ this.calculateWidth() }
                height={ this.calculateHeight() }>
                { this.renderLines() }
                { this.renderPlayers() }
            </svg>
        );
    }

    public renderLines() {
        return this.segments
            .map(points => SVGCreator.createLineBetweenPoints(points.p1, points.p2))
            .map(line => <path d = {line} key = {Math.random() } strokeWidth= '3' stroke= 'green' />);
    }

    public renderPlayers() {
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

    protected calculateHeight() { return 0; }
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
        this.createVisualGraph();
        this.fillGraphWithMembers();
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
            x: o.invDepth * 150 + 50,
            y: (o.index * (1 << (o.invDepth + 1)) + (1 << o.invDepth)) * 50 + 50,
            width: 150,
        };
    }

    private createVisualGraph() {
        for (const node of this.nodeList) {
            this.drawHorizontalLine(node.data.position.x, node.data.position.y, node.data.position.width);
        }
        this.drawVerticalLines();
    }

    private drawHorizontalLine(x: number, y: number, length: number) {
        this.segments.push({
            p1: { x: x, y },
            p2: { x: x + length, y },
        });
    }

    private drawVerticalLines() {
        this.nodeList.forEach(node => {
            const children = node.getChildren();
            if (children.length === 0)
                return;

            const pos1 = children[0].data.position;
            const pos2 = children[1].data.position;

            this.segments.push({
                p1: { x: pos1.x + pos1.width, y: pos1.y },
                p2: { x: pos2.x + pos2.width, y: pos2.y },
            });
        });
    }

    private fillGraphWithMembers() {
        const _members = shuffle(this.props.members);
        this.nodeList
            .filter(node => node.getDepth() === this.depth)
            .forEach(node => node.data.member = _members.pop());
    }

    protected calculateWidth() {
        return (this.depth + 1) * 150 + 100;
    }

    protected calculateHeight() {
        return (1 << this.depth) * 100 + 100;
    }
}

export class DoubleEliminationTree extends EliminationTree {

}

export class RepechageTree extends EliminationTree {

}
