// @flow
import { type Change } from 'slate';
import createRow from '../createRow';
import TablePosition from '../TablePosition';

import type Options from '../options';

/**
 * Insert a new row in current table
 */
function insertRow(
    opts: Options,
    change: Change,
    at?: number, // row index
    textGetter?: number => string
) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    // Create a new row with the right count of cells
    const firstRow = table.nodes.get(0);
    const newRow = createRow(opts, firstRow.nodes.size, textGetter);

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    return change
        .insertNodeByKey(table.key, at, newRow)
        .collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
