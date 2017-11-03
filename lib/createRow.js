// @flow
import { Range } from 'immutable';
import { Block } from 'slate';
import createCell from './createCell';

import type Options from './options';

/**
 * Create a new row block
 */
function createRow(
    opts: Options,
    columns: number,
    textGetter?: number => string
): Block {
    const cellNodes = Range(0, columns)
        .map(i => createCell(opts.typeCell, textGetter ? textGetter(i) : ''))
        .toList();

    return Block.create({
        type: opts.typeRow,
        nodes: cellNodes
    });
}

export default createRow;
