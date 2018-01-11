// @flow
import { type Change, Range } from 'slate';

function removeTextsFromStart(change: Change, range: Range): Change {
    const { startKey, startOffset } = range;
    const { document } = change.value;
    const block = document.getClosestBlock(startKey);
    if (!block) return change;

    const cellRange = Range.create()
        .moveAnchorTo(startKey, startOffset)
        .moveFocusToEndOf(block);
    return change.deleteAtRange(cellRange);
}
export default removeTextsFromStart;
