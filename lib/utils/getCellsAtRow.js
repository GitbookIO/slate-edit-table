// @flow
import { type Block, Editor } from 'slate';
import { type List } from 'immutable';

import type Options from '../options';

/**
 * Returns the list of cells at the given row index
 */
function getCellsAtRow(
    opts: Options,
    editor: Editor,
    table: Block,
    rowIndex: number,
): List<Block> {
    return table.nodes.get(rowIndex).nodes;
}

export default getCellsAtRow;
