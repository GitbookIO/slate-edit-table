// @flow
import { type Change } from 'slate';
import { List } from 'immutable';

import { TablePosition, createCell } from '../utils';
import { moveSelection } from '../changes';

import ALIGN from '../ALIGN';

import type Options from '../options';

/**
 * Insert a new column in current table
 */
function insertColumn(
    opts: Options,
    change: Change,
    at?: number, // Column index
    columnAlign: string = ALIGN.DEFAULT
) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex() + 1;
    }

    // Insert the new cell
    table.nodes.forEach(row => {
        const newCell = createCell(opts.typeCell);
        change.insertNodeByKey(row.key, at, newCell, { normalize: false });
    });

    // Update alignment
    let align = table.data.get('align');
    align = List(align)
        .insert(at, columnAlign)
        .toArray();
    change.setNodeByKey(table.key, {
        data: table.data.set('align', align)
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
