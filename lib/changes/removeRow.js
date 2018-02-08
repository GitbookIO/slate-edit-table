// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(opts: Options, change: Change, at: number): Change {
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(opts, state, startBlock);
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
            cell.nodes.forEach((node, index) => {
                change.removeNodeByKey(node.key, {
                    normalize: index === cell.nodes.size - 1
                });
            });
        });
    }

    return change;
}

export default removeRow;
