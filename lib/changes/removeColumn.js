// @flow
import { Text, type Change } from 'slate';
import { List } from 'immutable';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Delete current column in a table
 */
function removeColumn(
    opts: Options,
    change: Change,
    at: number,
    editOptions: Object = {}
): Change {
    const { normalize = true, snapshot = true } = editOptions;
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    if (snapshot) {
        change.snapshotSelection();
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
        const { focusKey, anchorKey } = change.value.selection;
        rows.forEach(row => {
            row.nodes.forEach(cell => {
                // Remove all cell texts; But keep at least one Text Node, for preventing error of not finding DOM
                const focusText = cell.getDescendant(focusKey);
                const anchorText = cell.getDescendant(anchorKey);
                cell = cell.set('nodes', List.of(Text.create('')));
                change.replaceNodeByKey(cell.key, cell, { normalize: false });

                // We should keep the cursor, but we can do it later
                if (focusText) {
                    change.moveFocusToStartOf(cell);
                }
                if (anchorText) {
                    change.moveAnchorToStartOf(cell);
                }
            });
        });
    }
    if (normalize) {
        change.normalizeNodeByKey(table.key);
    }

    // Replace the table
    return change;
}

export default removeColumn;
