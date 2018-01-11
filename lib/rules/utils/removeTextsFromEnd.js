// @flow
import { type Change, Range } from 'slate';

function removeTextsFromEnd(change: Change, range: Range): Change {
    const { endKey, endOffset } = range;
    const { document } = change.value;
    const block = document.getClosestBlock(endKey);

    if (!block) {
        return change;
    }

    const cellRange = Range.create()
        .moveFocusTo(endKey, endOffset)
        .moveAnchorToStartOf(block);
    return change.deleteAtRange(cellRange);
}
export default removeTextsFromEnd;
