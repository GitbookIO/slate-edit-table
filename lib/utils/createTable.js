// @flow
import { Range } from 'immutable';
import { Block, type Node } from 'slate';

import type Options from '../options';
import createRow from './createRow';

/**
 * Create a table
 */
function createTable(
    opts: Options,
    columns: number,
    rows: number,
    getCellContent?: (row: number, column: number) => Node[]
): Block {
    const rowNodes = Range(0, rows)
        .map(i =>
            createRow(
                opts,
                columns,
                getCellContent ? getCellContent.bind(null, i) : undefined
            )
        )
        .toJS();

    return Block.create({
        type: opts.typeTable,
        nodes: Block.createList(rowNodes)
    });
}

export default createTable;
