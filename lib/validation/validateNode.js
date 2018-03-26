// @flow

import { Block } from 'slate';
import type Options from '../options';

/*
 * Ensure each row has the same number of columns.
 */
function validateNode(opts: Options) {
    return node => {
        if (node.type !== opts.typeTable) {
            return undefined;
        }

        const rows = node.nodes.filter(child => child.type === opts.typeRow);
        const maxColumns = Math.max(
            // Minimum 1 column
            1,
            rows
                .map(
                    row =>
                        row.nodes.filter(child => child.type === opts.typeCell)
                            .size
                )
                .max()
        );
        const rowsMissingColumns = rows.filter(
            row => row.nodes.size < maxColumns
        );

        if (rowsMissingColumns.isEmpty()) {
            return undefined;
        }

        return change => {
            rowsMissingColumns.forEach(row => {
                const numberOfCellsToAdd = maxColumns - row.nodes.size;
                Array.from({ length: numberOfCellsToAdd })
                    .map(() => Block.create({ type: opts.typeCell }))
                    .forEach(cell =>
                        change.insertNodeByKey(row.key, row.nodes.size, cell)
                    );
            });
        };
    };
}

export default validateNode;
