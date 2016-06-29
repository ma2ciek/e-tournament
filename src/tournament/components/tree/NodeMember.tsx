import * as React from 'react';
import BinaryNode from '../../../util/TreeNode';
import SVGCreator from '../../../util/SVGCreator.tsx';
import { IMember } from '../../model';
import { SVGSelectionMenu } from './SVGSelectionMenu.tsx';
import { TreeData } from './EliminationTree';

export interface NodeMemberProps {
    node: BinaryNode<TreeData>;
    index: number;
    selected: boolean;
    hovered: boolean;
    members: IMember[];
    options: {
        BACKGROUND_COLOR: string;
        COLOR: string;
        LINE_WIDTH: number;
    };
    onSelect(node: BinaryNode<TreeData>): void;
    onHover(node: BinaryNode<TreeData>): void;
    replace(currentNode: BinaryNode<TreeData>, nextMember: IMember): void;
}

export const NodeMember = ({ node, index, replace, selected, hovered, members, options, onHover, onSelect}: NodeMemberProps) => (
    <g
        cursor='pointer'
        key={ index }
        tabIndex={ index + 1 }
        onClick={ () => onSelect(node) }
        onFocus={ () => onSelect(node) }
        onBlur={ () => onSelect(null) }
        onMouseEnter={ () => onHover(node) }
        onMouseLeave={ () => onHover(null) }
        className='startNode'
        >
        { SVGCreator.createTextInRect({
            width: node.data.position.width * 3 / 4,
            height: node.data.position.height,
            centerX: node.data.position.x + node.data.position.width / 2,
            centerY: node.data.position.y - node.data.position.height / 2,
            borderRadius: 10,
            color: (selected ? options.BACKGROUND_COLOR : hovered ? '#00f' : options.COLOR),
            bg: (selected ? options.COLOR : options.BACKGROUND_COLOR),
            text: node.data.member && node.data.member.firstName + ' ' + node.data.member.lastName,
            borderWidth: options.LINE_WIDTH,
        }) }

        { selected && (
            <SVGSelectionMenu
                options={ members.map(member => ({ text: member.firstName + ' ' + member.lastName })) }
                position={ node.data.position }
                mainColor={ options.COLOR }
                secondaryColor={ options.BACKGROUND_COLOR }
                padding={ 10 }
                onSelect={(memberIndex) => replace(node, members[memberIndex]) }
                />
        ) }
    </g>
);

export default NodeMember;
