import BinaryNode from '../../../util/TreeNode';
import { EliminationTree, TreeData, IPosition } from './EliminationTree.tsx';
import { log, Segment } from '../../../util/common';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 50;
const MARGIN = 50;

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
            height: NODE_HEIGHT / 2,
        };
    }

    protected createVisualGraph(): Segment[] {
        return [
            ...this.createHorizontalLine(),
            ...this.createVerticalLines(),
        ];
    }

    private createHorizontalLine(): Segment[] {
        return this.nodeList.map(node => [
            { x: node.data.position.x, y: node.data.position.y },
            { x: node.data.position.x + node.data.position.width, y: node.data.position.y },
        ]);
    }

    private createVerticalLines(): Segment[] {
        return this.nodeList
            .filter(node => node.getChildren().length > 0)
            .map(node => {
                const children = node.getChildren();

                const pos1 = children[0].data.position;
                const pos2 = children[1].data.position;

                return [
                    { x: pos1.x + pos1.width, y: pos1.y },
                    { x: pos2.x + pos2.width, y: pos2.y },
                ];
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
