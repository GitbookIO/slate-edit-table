// @flow
import { type Change } from 'slate';

import { createTable } from '../utils';
import type Options from '../options';

/**
 * Insert a new table
 */
function insertTable(
    opts: Options,
    change: Change,
    columns?: number = 2,
    rows?: number = 2
): Change {
    const { value } = change;

    if (!value.selection.startKey) return change;

    // Create the table node
    const fillWithEmptyText = (x, y) => '';
    const table = createTable(opts, columns, rows, fillWithEmptyText);

    return change.insertBlock(table);
}

export default insertTable;
