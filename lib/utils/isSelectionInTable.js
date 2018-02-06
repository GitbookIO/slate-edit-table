// @flow

import type { State } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, state: State): boolean {
    if (!state.selection.startKey) return false;

    const { startBlock, endBlock } = state;

    // Only handle events in cells
    if (startBlock.type !== opts.typeCell || endBlock.type !== opts.typeCell) {
        return false;
    }

    if (startBlock === endBlock) {
        return startBlock.type === opts.typeCell;
    }
    // Not the same cell, look into ancestor chain:

    const startAncestors = state.document
        .getAncestors(startBlock.key)
        .slice(-2);
    const endAncestors = state.document.getAncestors(endBlock.key).slice(-2);

    // Check for same table row
    const startRow = startAncestors.last();
    const endRow = endAncestors.last();
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    // Check for same table
    const startTable = startAncestors.first();
    const endTable = endAncestors.first();
    return startTable === endTable;
}

export default isSelectionInTable;
