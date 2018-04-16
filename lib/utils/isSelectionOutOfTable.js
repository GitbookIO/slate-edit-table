// @flow

import type { Value } from 'slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startKey, endKey } = value;

    const startPosition = TablePosition.create(opts, value.document, startKey);
    const endPosition = TablePosition.create(opts, value.document, endKey);

    // Only handle events in tables
    return !startPosition.isInTable() && !endPosition.isInTable();
}

export default isSelectionOutOfTable;
