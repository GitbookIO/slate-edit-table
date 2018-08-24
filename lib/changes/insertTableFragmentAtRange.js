// @flow
import { type Change, type Range, type Document } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Used when pasting a fragment of table into another one
 */
function insertTableFragmentAtRange(
    opts: Options,
    change: Change,
    range: Range,
    fragment: Document
): Change {
    const table = fragment.nodes.first();

    if (
        !(fragment.nodes.size === 1 && table && table.type === opts.typeTable)
    ) {
        throw new Error('Expected to insert a fragment containing one table');
    }

    // If the range is expanded, delete it first.
    // To do that, we reuse Slate.insertFragmentAtRange logic
    // but with an empty fragment.
    const emptyFragment = fragment.merge({
        nodes: fragment.nodes.slice(0, 0)
    });
    change
        .insertFragmentAtRange(range, emptyFragment)
        // Make sure the selection is collapsed
        .collapseToAnchor();

    const { value } = change;
    const tablePosition = TablePosition.create(
        opts,
        value.document,
        value.selection.startKey
    );

    const rows = table.nodes;

    rows.forEach((row, rowIndex) => {
        change.insertNodeByKey(
            tablePosition.table.key,
            tablePosition.getRowIndex() + rowIndex,
            row,
            { normalize: rowIndex === rows.size - 1 }
        );
    });

    return change.collapseToEndOf(rows.last());
}

export default insertTableFragmentAtRange;
