/* @flow */
import { type Value, type Document } from 'slate';
import { Range } from 'immutable';

import type Options from '../options';
import { isSelectionInTable, TablePosition, createCell } from '../utils';

/*
 * Alters what is copied to the clipboard in the following cases:
 * - Copying the content of a single cell
 */
function getCopiedFragment(opts: Options, value: Value): ?Document {
    // Outside of tables, do not alter copy behavior
    if (!isSelectionInTable(opts, value)) {
        return undefined;
    }

    const { selection, document } = value;
    const startPosition = TablePosition.create(
        opts,
        document,
        selection.startKey
    );
    const endPosition = TablePosition.create(opts, document, selection.endKey);

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

    // The selection is a fragment of given table,
    // we want to pad with empty cells to preserve a valid table
    const table = baseFragment.nodes.first();
    const firstRow = table.nodes.first();
    const endRow = table.nodes.last();

    const startPadding = new Range(0, startPosition.getColumnIndex())
        .toList()
        .map(() => createCell(opts));

    const endPadding = new Range(
        endPosition.getColumnIndex() + 1,
        endPosition.getWidth()
    )
        .toList()
        .map(() => createCell(opts));

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
