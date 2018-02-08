// @flow
import { Text, type Change } from 'slate';
import { List } from 'immutable';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(
    opts: Options,
    change: Change,
    at: number,
    editOptions: Object = {}
): Change {
    const { snapshot = true, normalize = true } = editOptions;
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getRowIndex();
    }
    if (snapshot) {
        change.snapshotSelection();
    }

    const row = table.nodes.get(at);
    // Update table by removing the row
    if (pos.getHeight() > 1) {
        change.removeNodeByKey(row.key, { normalize: false });
    } else {
        // If last remaining row, clear all text content
        // However, a Text Node should be left here to prevent error

        const { focusKey, anchorKey } = change.value.selection;
        row.nodes.forEach(cell => {
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
    }
    if (normalize) {
        change.normalizeNodeByKey(table.key);
    }

    return change;
}

export default removeRow;
