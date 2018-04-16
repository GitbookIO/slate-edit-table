// @flow
import { type Block } from 'slate';

import type Options from '../options';

/**
 * Run the given function against each cells of the table
 */
function forEachCells(
    opts: Options,
    // The table
    table: Block,
    fn: (cell: Block, row: number, column: number) => any
): void {
    return table.nodes.forEach((row, rowIndex) =>
        row.nodes.forEach((cell, columnIndex) =>
            fn(cell, rowIndex, columnIndex)
        )
    );
}

export default forEachCells;
