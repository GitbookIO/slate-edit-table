// @flow
import { type Change } from '@gitbook/slate';

import { TablePosition } from '../utils';
import clearCell from './clearCell';
import type Options from '../options';

/**
 * Delete the column associated with the given cell key in a table
 */
function removeColumnByKey(opts: Options, change: Change, key: string): Change {
    const { value } = change;

    const pos = TablePosition.create(opts, value.document, key);
    const { table } = pos;

    const colIndex = pos.getColumnIndex();

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(row => {
            const cell = row.nodes.get(colIndex);
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

export default removeColumnByKey;
