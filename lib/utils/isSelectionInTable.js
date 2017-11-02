// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startBlock } = value;

    // Only handle events in cells
    return startBlock.type === opts.typeCell;
}

export default isSelectionInTable;
