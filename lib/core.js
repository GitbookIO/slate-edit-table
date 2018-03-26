// @flow
import {
    insertTable,
    insertRow,
    removeRow,
    insertColumn,
    removeColumn,
    removeTable,
    clearCell,
    moveSelection,
    moveSelectionBy
} from './changes';
import {
    isSelectionInTable,
    isSelectionOutOfTable,
    getPosition,
    createCell,
    createRow,
    createTable,
    forEachCells,
    getCellsAtRow,
    getCellsAtColumn
} from './utils';
import { schema, validateNode } from './validation';

import Options, { type OptionsFormat } from './options';

/**
 * Returns the core of the plugin, limited to the validation and normalization
 * part of `slate-edit-table`, and utils.
 *
 * Import this directly: `import EditTable from 'slate-edit-table/lib/core'`
 * if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 * That way you do not depend on `slate-react`.
 */
function core(optionsParam: Options | OptionsFormat): Object {
    const opts = new Options(optionsParam);

    return {
        schema: schema(opts),
        validateNode: validateNode(opts),

        utils: {
            isSelectionInTable: isSelectionInTable.bind(null, opts),
            isSelectionOutOfTable: isSelectionOutOfTable.bind(null, opts),
            getPosition: getPosition.bind(null, opts),
            createCell: createCell.bind(null, opts),
            createRow: createRow.bind(null, opts),
            createTable: createTable.bind(null, opts),
            forEachCells: forEachCells.bind(null, opts),
            getCellsAtRow: getCellsAtRow.bind(null, opts),
            getCellsAtColumn: getCellsAtColumn.bind(null, opts)
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            clearCell: clearCell.bind(null, opts),
            insertRow: bindAndScopeChange(opts, insertRow),
            removeRow: bindAndScopeChange(opts, removeRow),
            insertColumn: bindAndScopeChange(opts, insertColumn),
            removeColumn: bindAndScopeChange(opts, removeColumn),
            removeTable: bindAndScopeChange(opts, removeTable),
            moveSelection: bindAndScopeChange(opts, moveSelection),
            moveSelectionBy: bindAndScopeChange(opts, moveSelectionBy)
        }
    };
}

/**
 * Bind a change to given options, and scope it to act only inside a table
 */
function bindAndScopeChange(opts: Options, fn: *): * {
    return (change, ...args) => {
        const { value } = change;

        if (!isSelectionInTable(opts, value)) {
            return change;
        }

        // $FlowFixMe
        return fn(...[opts, change].concat(args));
    };
}

export default core;
