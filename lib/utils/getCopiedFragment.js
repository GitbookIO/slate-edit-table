/* @flow */
import { type Value, type Document } from '@gitbook/slate';
import { List } from 'immutable';

import type Options from '../options';
import { isSelectionInTable, TablePosition, createCell } from '../utils';

/*
 * Alters what is copied to the clipboard when copying a fragment of a table:
 * - Copying the content of a single cell: just copy the content of the cell
 * - Copying multiple cells: normalize the selection to copy a valid table
 */
function getCopiedFragment(opts: Options, value: Value): ?Document {
    // Outside of tables, do not alter copy behavior
    if (!isSelectionInTable(opts, value)) {
        return undefined;
    }
    // else the selection is a fragment of one table

    const { selection, document } = value;
    const startPosition = TablePosition.create(
        opts,
        document,
        selection.startKey
    );
    const endPosition = TablePosition.create(opts, document, selection.endKey);

    // Fragment as it would be copied by Slate
    const baseFragment = value.fragment;

    if (endPosition.cell === startPosition.cell) {
        // The selection is inside a single cell. Only copy the content of that cell
        const copiedCell = baseFragment
            .getAncestors(baseFragment.getFirstText().key)
            .findLast(n => n.type === opts.typeCell);

        return baseFragment.merge({
            nodes: copiedCell.nodes
        });
    }

    // We want to pad with empty cells to put a valid table into the clipboard
    const table = baseFragment.nodes.first();
    const firstRow = table.nodes.first();
    const endRow = table.nodes.last();

    const startPadding = List(Array(startPosition.getColumnIndex()).fill()).map(
        () => createCell(opts)
    );

    const endPadding = List(
        Array(
            endPosition.getWidth() - (endPosition.getColumnIndex() + 1)
        ).fill()
    ).map(() => createCell(opts));

    return baseFragment.mapDescendants(node => {
        if (node === firstRow) {
            return firstRow.merge({
                nodes: startPadding.concat(firstRow.nodes)
            });
        }

        if (node === endRow) {
            return endRow.merge({
                nodes: endRow.nodes.concat(endPadding)
            });
        }

        return node;
    });
}

export default getCopiedFragment;
