// @flow
import { type Change, type Block } from 'slate';

import { TablePosition, createRow } from '../utils';
import type Options from '../options';

/**
 * Insert a new row in current table
 */
function insertRow(
    opts: Options,
    change: Change,
    at?: number, // row index
    getRow?: (columns: number) => Block // Generate the row yourself
) {
    const { value } = change;
    const { startKey } = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const { table } = pos;

    // Create a new row with the right count of cells
    const columns = table.nodes.get(0).nodes.size;
    const newRow = getRow ? getRow(columns) : createRow(opts, columns);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return change
        .insertNodeByKey(table.key, at, newRow)
        .collapseToEndOf(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
