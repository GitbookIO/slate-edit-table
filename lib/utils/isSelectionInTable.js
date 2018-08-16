// @flow

import type { Value } from 'slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
    if (!value.selection.start.key) return false;

    const { document, selection } = value;
    const startPosition = TablePosition.create(
        opts,
        document,
        selection.start.key
    );
    const endPosition = TablePosition.create(opts, document, selection.end.key);

    // Only handle events in tables
    if (!startPosition.isInTable() || !endPosition.isInTable()) {
        return false;
    }

    // Inside the same table
    return startPosition.table === endPosition.table;
}

export default isSelectionInTable;
