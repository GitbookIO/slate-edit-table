// @flow

import { type Node, Editor } from 'slate';
import type Options from '../options';
import { createCell } from '../utils';

/*
 * Ensure each row has the same number of columns.
 */
function normalizeNode(opts: Options) {
    const isRow = node => node.type === opts.typeRow;
    const isCell = node => node.type === opts.typeCell;
    const countCells = row => row.nodes.count(isCell);

    return (node: Node, editor: Editor, next: () => {}) => {
        if (node.type !== opts.typeTable) {
            return next();
        }

        const rows = node.nodes.filter(isRow);
        const maxColumns = Math.max(
            // Minimum 1 column
            1,
            rows.map(countCells).max(),
        );
        const rowsMissingColumns = rows.filter(
            row => countCells(row) < maxColumns,
        );
        if (rowsMissingColumns.isEmpty()) {
            return next();
        }

        return () => {
            editor.withoutNormalizing(() => {
                rowsMissingColumns.forEach(row => {
                    const numberOfCellsToAdd = maxColumns - countCells(row);
                    const cells = Array.from({
                        length: numberOfCellsToAdd,
                    }).map(() => createCell(opts));
                    cells.forEach(cell =>
                        editor.insertNodeByKey(row.key, row.nodes.size, cell),
                    );
                });
            });
        };
    };
}

export default normalizeNode;
