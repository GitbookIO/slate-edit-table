// @flow

import type { State } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts: Options, state: State): boolean {
    if (!state.selection.startKey) return false;

    const { startBlock, endBlock } = state;

    // Only handle events in cells
    return startBlock.type !== opts.typeCell && endBlock.type !== opts.typeCell;
}

export default isSelectionOutOfTable;
