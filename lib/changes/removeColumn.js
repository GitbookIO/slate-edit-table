// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import clearCell from './clearCell';
import type Options from '../options';

/**
 * Delete current column in a table
 */
function removeColumn(opts: Options, change: Change, at: number): Change {
    const { value } = change;
    const { startKey } = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(row => {
            const cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key, { normalize: false });
        });
    } else {
        // If last column, clear text in cells instead
        rows.forEach(row => {
            row.nodes.forEach(cell => {
                cell.nodes.forEach(node => clearCell(opts, change, cell));
            });
        });
    }

    // Replace the table
    return change;
}

export default removeColumn;
