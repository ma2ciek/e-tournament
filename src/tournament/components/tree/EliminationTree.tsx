import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator';
import { shuffle } from '../../../util/common';
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

    protected linePoints: any[] = [];

    public render() {
        return (
            <svg width='1000' height='1000'>
                { this.renderLines() }
                { this.renderPlayers() }
            </svg>
        );
    }

    public renderLines() {
        return this.linePoints
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
}

interface TreeData {
    position: IPosition;
    member: IMember;
}

interface IPosition {
    x: number
    y: number;
    width: number;
}

export class SingleEliminationTree extends EliminationTree {
    public componentWillMount() {
        const members = this.props.members;
        const maxDepth = Math.ceil(Math.log2(members.length));
        this.createBinaryTree(maxDepth);
        this.createVisualGraph(maxDepth);
        this.fillGraphWithMembers(maxDepth);
    }

    private createBinaryTree(size: number) {
        this.root.data = {
            position: this.getPosition({ index: 0, invDepth: size }),
            member: null,
        };
        this.addNodes(this.root, size);
    }

    private addNodes(parent: BinaryNode<TreeData>, maxDepth: number) {
        if (parent.getDepth() >= maxDepth)
            return;

        this.createChild(parent, maxDepth, true);
        this.createChild(parent, maxDepth, false);
    }

    private createChild(parent: BinaryNode<TreeData>, maxDepth: number, first: boolean) {
        const data = this.getPosition({
            index: parent.getAbsoluteIndex() + (first ? 0 : (1 << parent.getDepth())),
            invDepth: maxDepth - parent.getDepth() - 1,
        });
        const child = parent.addChild({ position: data, member: null });
        this.addNodes(child, maxDepth);
        this.nodeList.push(child);
    }

    private getPosition(o: { index: number, invDepth: number }): IPosition {
        return {
            x: o.invDepth * 150 + 50,
            y: (o.index * (1 << (o.invDepth + 1)) + (1 << o.invDepth)) * 50 + 50,
            width: 150,
        };
    }

    private createVisualGraph(maxDepth: number) {
        for (const node of this.nodeList) {
            this.drawHorizontalLine(node.data.position.x, node.data.position.y, node.data.position.width);
        }
    }

    private drawHorizontalLine(x: number, y: number, length: number) {
        this.linePoints.push({
            p1: { x: x, y },
            p2: { x: x + length, y }
        });
    }

    private fillGraphWithMembers(maxDepth: number) {
        const _members = shuffle(this.props.members);
        this.nodeList
            .filter(node => node.getDepth() === maxDepth)
            .forEach(node => node.data.member = _members.pop());
    }
}

export class DoubleEliminationTree extends EliminationTree {

}

export class RepechageTree extends EliminationTree {

}
