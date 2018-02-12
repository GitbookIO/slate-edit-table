// @flow
import { Range } from 'immutable';
import { Block, type Node } from 'slate';

import type Options from '../options';
import createCell from './createCell';

/**
 * Create a new row block
 */
function createRow(
    opts: Options,
    columns: number,
    getCellContent?: (column: number) => Node[]
): Block {
    const cellNodes = Range(0, columns)
        .map(i =>
            createCell(opts, getCellContent ? getCellContent(i) : undefined)
        )
        .toList();

    return Block.create({
        type: opts.typeRow,
        nodes: cellNodes
    });
}

export default createRow;
