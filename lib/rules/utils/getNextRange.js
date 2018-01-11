// @flow
import { type Node, Range } from 'slate';

function getNextRange(
    node: Node,
    range: Range,
    shouldFix: { shouldFixStart: boolean, shouldFixEnd: boolean }
): Range {
    const { shouldFixStart, shouldFixEnd } = shouldFix;

    let { startKey, startOffset, endKey, endOffset } = range;
    if (shouldFixStart) {
        const cell = node.getClosestBlock(startKey);
        const row = node.getParent(cell);
        const startText = row.getFirstText();
        startKey = startText.key;
        startOffset = 0;
    }

    if (shouldFixEnd) {
        const cell = node.getClosestBlock(endKey);
        const row = node.getParent(cell);
        const endText = row.findLastText();
        endKey = endText.key;
        endOffset = endText.text.length;
    }

    return Range.create()
        .moveAnchorTo(startKey, startOffset)
        .moveFocusTo(endKey, endOffset);
}

export default getNextRange;
