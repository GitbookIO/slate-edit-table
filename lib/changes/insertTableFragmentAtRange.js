// @flow
import { type Change, type Range, type Document } from '@gitbook/slate';

import { insertRow, insertColumn } from '../changes';
import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Used when pasting a fragment of table into another one
 */
function insertTableFragmentAtRange(
    opts: Options,
    change: Change,
    range: Range,
    // This fragment should contain only one table,
    // with a valid number of cells
    fragment: Document
): Change {
    const insertedTable = fragment.nodes.first();
    if (
        !(
            fragment.nodes.size === 1 &&
            insertedTable &&
            insertedTable.type === opts.typeTable
        )
    ) {
        throw new Error('Expected to insert a fragment containing one table');
    }

    const { value } = change;
    const targetPosition = TablePosition.create(
        opts,
        value.document,
        value.selection.startKey
    );

    const fragmentRows = insertedTable.nodes;
    const fragmentHeight = fragmentRows.size;
    const fragmentWidth = fragmentRows.first().nodes.size;

    // Insert columns and rows to accomodate the incoming pasted cells
    const missingWidth =
        fragmentWidth +
        targetPosition.getColumnIndex() -
        targetPosition.getWidth();
    const missingHeight =
        fragmentHeight +
        targetPosition.getRowIndex() -
        targetPosition.getHeight();

    if (missingWidth > 0) {
        // Add columns
        Array(missingWidth)
            .fill()
            .forEach(() => {
                insertColumn(opts, change, targetPosition.getWidth());
            });
    }
    if (missingHeight > 0) {
        // Add rows
        Array(missingHeight)
            .fill()
            .forEach(() => {
                insertRow(opts, change, targetPosition.getHeight());
            });
    }

    // Patch the inserted table over the target table, overwritting the cells
    const existingTable = change.value.document.getDescendant(
        targetPosition.table.key
    );

    fragmentRows.forEach((fragmentRow, fragmentRowIndex) => {
        fragmentRow.nodes.forEach((newCell, fragmentColumnIndex) => {
            const existingCell = existingTable.nodes
                .get(targetPosition.getRowIndex() + fragmentRowIndex)
                .nodes.get(
                    targetPosition.getColumnIndex() + fragmentColumnIndex
                );

            change.replaceNodeByKey(existingCell.key, newCell, {
                normalize: false
            });
        });
    });

    const lastPastedCell = fragmentRows.last().nodes.last();
    return change.collapseToEndOf(lastPastedCell);
}

export default insertTableFragmentAtRange;
