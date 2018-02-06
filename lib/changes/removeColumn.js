// @flow
import { type Change } from 'slate';
import { List } from 'immutable';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Delete current column in a table
 */
function removeColumn(opts: Options, change: Change, at: number): Change {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
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

        // Update alignment
        let presetAlign = table.data.get('presetAlign');
        presetAlign = List(presetAlign)
            .delete(at)
            .toArray();
        change.setNodeByKey(table.key, {
            data: table.data.set('presetAlign', presetAlign)
        });
    } else {
        // If last column, clear text in cells instead
        rows.forEach(row => {
            row.nodes.forEach(cell => {
                cell.nodes.forEach(node => {
                    // We clear the texts in the cells
                    change.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return change;
}

export default removeColumn;
