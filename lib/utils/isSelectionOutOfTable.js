// @flow

import type { Value } from 'slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * Are the selection start and end outside a table.
 */
function isSelectionOutOfTable(opts: Options, value: Value): boolean {
    if (!value.selection.start.key) return false;

    const { document, selection } = value;

    const startPosition = TablePosition.create(
        opts,
        document,
        selection.start.key
    );
    const endPosition = TablePosition.create(opts, document, selection.end.key);

    // Only handle events in tables
    return !startPosition.isInTable() && !endPosition.isInTable();
}

export default isSelectionOutOfTable;
