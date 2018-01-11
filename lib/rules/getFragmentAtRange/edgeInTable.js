// @flow
import { type Node, Range, type Document } from 'slate';
import type Options from '../../options';

function edgeInTable(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { startKey, endKey, startOffset, endOffset } = range;

    const startBlock = node.getClosestBlock(startKey);
    const endBlock = node.getClosestBlock(endKey);

    if (startBlock.type === opts.typeCell) {
        const table = node.getAncestors(startBlock.key).get(-2);
        const beforeFragment = rootGetFragment(
            node,
            Range.create()
                .moveAnchorTo(startKey, startOffset)
                .moveFocusToEndOf(table)
        );
        const contentFragment = rootGetFragment(
            node,
            Range.create()
                .moveAnchorToEndOf(table)
                .moveFocusTo(endKey, endOffset)
        );
        return beforeFragment.set(
            'nodes',
            beforeFragment.nodes.concat(contentFragment.nodes)
        );
    }

    if (endBlock.type === opts.typeCell) {
        const table = node.getAncestors(endBlock.key).get(-2);
        const afterFragment = rootGetFragment(
            node,
            Range.create()
                .moveAnchorToStartOf(table)
                .moveFocusTo(endKey, endOffset)
        );
        const contentFragment = rootGetFragment(
            node,
            Range.create()
                .moveAnchorTo(startKey, startOffset)
                .moveFocusToStartOf(table)
        );
        return contentFragment.set(
            'nodes',
            contentFragment.nodes.concat(afterFragment.nodes)
        );
    }
    return next();
}

export default edgeInTable;
