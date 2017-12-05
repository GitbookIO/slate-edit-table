// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startBlock, endBlock } = value;

    // Only handle events in cells
    if (startBlock === endBlock ) {
      return startBlock.type === opts.typeCell;
    }
    if (startBlock.type !== opts.typeCell) {
       return false;
    }
    if (endBlock.type !== opts.typeCell) {
      return false;
    }

    // Ensure the startBlock and endBlock is in the same tableCell
    const startRow = value.document.getParent(startBlock);
    const endRow = value.document.getParent(endBlock)
    if (startRow === endRow) {
      return true
    }
    return (value.document.getParent(startRow) === value.document.getParent(endRow)) 
}

export default isSelectionInTable;
