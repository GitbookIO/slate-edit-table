// @flow
import { type Node, Range, Document } from 'slate';
import type Options from '../../options';

function endAtStartOfTable(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { endKey, endOffset } = range;

    const endBlock = node.getClosestBlock(endKey);
    if (!endBlock || endBlock.type !== opts.typeCell) {
        return next();
    }
    const table = node.getAncestors(endBlock.key).get(-2);
    if (table.getFirstText().key !== endKey || endOffset !== 0) {
        return next();
    }

    const prevText = node.getPreviousText(endKey);

    if (!prevText) {
        return node.getFragmentAtRange(range);
    }

    const prevRange = Range.create()
        .moveAnchorTo(range.startKey, range.startOffset)
        .moveFocusToEndOf(prevText);

    return rootGetFragment(node, prevRange);
}

export default endAtStartOfTable;
