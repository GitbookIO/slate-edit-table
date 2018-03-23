// @flow
import { type Change, type Block } from 'slate';

import { TablePosition, createCell } from '../utils';
import { moveSelection } from '../changes';

import type Options from '../options';

/**
 * Insert a new column in current table
 */
function insertColumn(
    opts: Options,
    change: Change,
    at?: number, // Column index
    getCell?: (column: number, row: number) => Block
): Change {
    const { value } = change;
    const { startKey } = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const { table } = pos;

    const columnIndex =
        typeof at === 'undefined' ? pos.getColumnIndex() + 1 : at;

    // Insert the new cell
    table.nodes.forEach((row, rowIndex) => {
        const newCell = getCell
            ? getCell(columnIndex, rowIndex)
            : createCell(opts);
        change.insertNodeByKey(row.key, columnIndex, newCell, {
            normalize: false
        });
    });

    // Update the selection (not doing can break the undo)
    return moveSelection(
        opts,
        change,
        pos.getColumnIndex() + 1,
        pos.getRowIndex()
    );
}

export default insertColumn;
