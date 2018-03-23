// @flow
import { type Change, type Node } from 'slate';

import { createTable } from '../utils';
import type Options from '../options';

/**
 * Insert a new table
 */
function insertTable(
    opts: Options,
    change: Change,
    columns?: number = 2,
    rows?: number = 2,
    getCellContent?: (column: number, row: number) => Node[]
): Change {
    const { value } = change;

    if (!value.selection.startKey) return change;

    // Create the table node
    const table = createTable(opts, columns, rows, getCellContent);

    return change.insertBlock(table);
}

export default insertTable;
