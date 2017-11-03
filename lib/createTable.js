// @flow
import { Range } from 'immutable';
import { Block } from 'slate';
import createRow from './createRow';
import createAlign from './createAlign';

import type Options from './options';

/**
 * Create a table
 */
function createTable(
    opts: Options,
    columns: number,
    rows: number,
    textGetter?: (row: number, column: number) => string
): Block {
    const rowNodes = Range(0, rows)
        .map(i =>
            createRow(
                opts,
                columns,
                textGetter ? textGetter.bind(null, i) : undefined
            )
        )
        .toList();
    const align = createAlign(columns);

    return Block.create({
        type: opts.typeTable,
        nodes: rowNodes,
        data: {
            align
        }
    });
}

export default createTable;
