export interface IBinaryNode<T> {
    parent: BinaryNode<T>;
    data: T;
    depth: number;
}

export default class BinaryNode<T> {
    public data: T;

    private parent: BinaryNode<T>;
    private children: BinaryNode<T>[];
    private depth: number;

    constructor(obj: IBinaryNode<T>) {
        this.parent = obj.parent;
        this.children = [];
        this.data = obj.data;
        this.depth = obj.depth;
    }

    public addChild(data: T): BinaryNode<T> {
        const node = new BinaryNode({
            parent: this,
            depth: this.depth + 1,
            data: data,
        });
        this.children.push(node);
        return node;
    }

    public getDepth() {
        return this.depth;
    }

    public getIndex() {
        return this.parent ?
            this.parent.children.indexOf(this) : 0;
    }

    public getAbsoluteIndex() {
        let index = this.getIndex();
        let node = this.parent;
        for (let i = 1; node != null; i++) {
            index += node.getIndex() * (1 << i);
            node = node.parent;
        }
        return index;
    }

    public getChildren() {
        return this.children;
    }
}
