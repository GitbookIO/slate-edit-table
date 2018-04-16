// @flow
import { Range, type Change, type Block } from 'slate';

import type Options from '../options';

/**
 * Clear the content of the given cell
 */
function clearCell(opts: Options, change: Change, cell: Block): Change {
    cell.nodes.forEach((node, index) => {
        const range = Range.create().moveToRangeOf(cell);
        change.deleteAtRange(range);
    });

    return change;
}

export default clearCell;
