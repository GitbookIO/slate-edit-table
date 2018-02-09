// @flow

import type { State } from 'slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts: Options, state: State): boolean {
    if (!state.selection.startKey) return false;

    const { startKey, endKey } = state;

    const startPosition = TablePosition.create(opts, state.document, startKey);
    const endPosition = TablePosition.create(opts, state.document, endKey);

    // Only handle events in tables
    return !startPosition.isInTable() && !endPosition.isInTable();
}

export default isSelectionOutOfTable;
