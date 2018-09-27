// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import clearCell from './clearCell';
import type Options from '../options';

/**
 * Remove the row associated to a given key in a table.
 * Clear thw row if last remaining row
 */
function removeRowByKey(opts: Options, change: Change, key: string): Change {
    const { value } = change;

    const pos = TablePosition.create(opts, value.document, key);

    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(key);
    } else {
        // If last remaining row, clear it instead
        pos.row.nodes.forEach(cell => {
            cell.nodes.forEach(node => clearCell(opts, change, cell));
        });
    }
    // this will also invalidate the selection - move it to the first cell
    // change.moveToRangeOfNode(pos.row.nodes.first());
    
    return change;
}

export default removeRowByKey;
