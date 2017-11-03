// @flow
import insertTable from './changes/insertTable';
import insertRow from './changes/insertRow';
import removeRow from './changes/removeRow';
import insertColumn from './changes/insertColumn';
import removeColumn from './changes/removeColumn';
import removeTable from './changes/removeTable';
import moveSelection from './changes/moveSelection';
import moveSelectionBy from './changes/moveSelectionBy';
import setColumnAlign from './changes/setColumnAlign';

import isSelectionInTable from './utils/isSelectionInTable';
import getPosition from './utils/getPosition';

import schema from './schema/schema';
import validateNode from './schema/validateNode';

import ALIGN from './ALIGN';
import Options, { type OptionsFormat } from './options';

/**
 * Returns a plugin limited to the validation and normalization part of `slate-edit-table`.
 *
 * Import this function only if you don't care about behavior/rendering and you
 * are only manipulating `Slate.Values` without rendering them.
 */
function schemaPlugin(optionsParam: Options | OptionsFormat): Object {
    const opts = new Options(optionsParam);

    return {
        schema: schema(opts),
        validateNode: validateNode(opts),

        utils: {
            isSelectionInTable: isSelectionInTable.bind(null, opts),
            getPosition: getPosition.bind(null, opts)
        },

        changes: {
            insertTable: insertTable.bind(null, opts),
            insertRow: bindAndScopeChange(opts, insertRow),
            removeRow: bindAndScopeChange(opts, removeRow),
            insertColumn: bindAndScopeChange(opts, insertColumn),
            removeColumn: bindAndScopeChange(opts, removeColumn),
            removeTable: bindAndScopeChange(opts, removeTable),
            moveSelection: bindAndScopeChange(opts, moveSelection),
            moveSelectionBy: bindAndScopeChange(opts, moveSelectionBy),
            setColumnAlign: bindAndScopeChange(opts, setColumnAlign)
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

// Expose aligns here too
schemaPlugin.ALIGN = ALIGN;

export default schemaPlugin;
