// @flow
import { type Node, Range, Document } from 'slate';
import type Options from '../../options';

function startAtEndOfTable(
    opts: Options,
    rootGetFragment: (Node, Range) => Document,
    node: Node,
    range: Range,
    next: () => Document
): Document {
    const { startKey, startOffset } = range;

    const startBlock = node.getClosestBlock(startKey);
    if (!startBlock || startBlock.type !== opts.typeCell) {
        return next();
    }

    const table = node.getAncestors(startBlock.key).get(-2);
    const startText = table.getLastText();
    if (startText.key !== startKey || startText.text.length !== startOffset) {
        return next();
    }

    const nextText = node.getNextText(startKey);
    if (!nextText) {
        return node.getFragmentAtRange(range);
    }
    const nextRange = Range.create()
        .moveAnchorToStartOf(nextText)
        .moveFocusTo(range.endKey, range.endOffset);

    return rootGetFragment(node, nextRange);
}

export default startAtEndOfTable;
