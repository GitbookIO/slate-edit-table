// @flow
import { type Change, Node, Range } from 'slate';

function removeAllTextsInCell(change: Change, node: Node): Change {
    const cellRange = Range.create().moveToRangeOf(node);
    return change.deleteAtRange(cellRange);
}
export default removeAllTextsInCell;
