// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import clearCell from './clearCell';
import type Options from '../options';

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(opts: Options, change: Change, at: number): Change {
    const { value } = change;
    const { startKey } = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }

    const row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(row.key);
    } else {
        // If last remaining row, clear it instead
        row.nodes.forEach(cell => {
            cell.nodes.forEach(node => clearCell(opts, change, cell));
        });
    }

    return change;
}

export default removeRow;
