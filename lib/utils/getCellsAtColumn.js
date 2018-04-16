// @flow
import { type Block } from 'slate';
import { type List } from 'immutable';

import type Options from '../options';

/**
 * Returns the list of cells at the given column index
 */
function getCellsAtColumn(
    opts: Options,
    // The table
    table: Block,
    columnIndex: number
): List<Block> {
    return table.nodes.map(row => row.nodes.get(columnIndex));
}

export default getCellsAtColumn;
