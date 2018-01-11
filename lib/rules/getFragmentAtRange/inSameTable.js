// @flow
import { type Node, Range, Document } from 'slate';
import type Options from '../../options';
// import getNextRange from '../utils/getNextRange';
import isSameTable from '../utils/isSameTable';

function inSameTable(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { startKey, endKey } = range;
    if (!isSameTable(opts, node, startKey, endKey)) {
        return next();
    }
    const startCell = node.getClosestBlock(startKey);
    const endCell = node.getClosestBlock(endKey);
    const firstCell = node.getParent(startCell.key).nodes.first();
    const lastCell = node.getParent(endCell.key).nodes.last();
    if (firstCell !== startCell) {
        const { endOffset } = range;
        const startFixedRange = Range.create()
            .moveAnchorToStartOf(firstCell)
            .moveFocusTo(endKey, endOffset);
        return rootGetFragment(node, startFixedRange);
    }
    if (lastCell !== endCell) {
        const { startOffset } = range;
        return rootGetFragment(
            node,
            Range.create()
                .moveAnchorTo(startKey, startOffset)
                .moveFocusToEndOf(lastCell)
        );
    }
    return node.getFragmentAtRange(range);
}

export default inSameTable;
