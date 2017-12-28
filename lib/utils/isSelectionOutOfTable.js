// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startBlock, endBlock } = value;

    // Only handle events in cells
    return startBlock.type !== opts.typeCell && endBlock.type !== opts.typeCell;
}

export default isSelectionOutOfTable;
