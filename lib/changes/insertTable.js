// @flow

import { type Editor } from 'slate';
import { createTable } from '../utils';

import type Options from '../options';

/**
 * Insert a new table
 */
function insertTable(
    opts: Options,
    editor: Editor,
    columns: number = 2,
    rows: number = 2,
    getCellContent: () => {},
) {
    const { value } = editor;

    if (!value.selection.start.key) return editor; // ?

    // Create the table node
    const table = createTable(opts, columns, rows, getCellContent);

    return editor.insertBlock(table);
}

export default insertTable;
