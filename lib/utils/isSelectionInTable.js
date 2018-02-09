// @flow

import type { State } from 'slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, state: State): boolean {
    if (!state.selection.startKey) return false;

    const { startKey, endKey } = state;
    const startPosition = TablePosition.create(opts, state.document, startKey);
    const endPosition = TablePosition.create(opts, state.document, endKey);

    // Only handle events in tables
    if (!startPosition.isInTable() || !endPosition.isInTable()) {
        return false;
    }

    // Inside the same table
    return startPosition.table === endPosition.table;
}

export default isSelectionInTable;
