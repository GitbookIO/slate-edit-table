// @flow

import { Block, type Change } from 'slate';
import {
    CHILD_OBJECT_INVALID,
    CHILD_TYPE_INVALID,
    PARENT_TYPE_INVALID
} from 'slate-schema-violations';
import { createRow, createCell } from '../utils';
import type Options from '../options';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.typeTable]: {
                nodes: [{ types: [opts.typeRow] }],
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        case CHILD_TYPE_INVALID:
                            return onlyRowsInTable(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            },
            [opts.typeRow]: {
                nodes: [{ types: [opts.typeCell] }],
                parent: { types: [opts.typeTable] },
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        case CHILD_TYPE_INVALID:
                            return onlyCellsInRow(opts, change, context);
                        case PARENT_TYPE_INVALID:
                            return rowOnlyInTable(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            },
            [opts.typeCell]: {
                nodes: [{ objects: ['block'] }],
                parent: { types: [opts.typeRow] },
                normalize(change: Change, violation: string, context: Object) {
                    switch (violation) {
                        case CHILD_OBJECT_INVALID:
                            return onlyBlocksInCell(opts, change, context);
                        case PARENT_TYPE_INVALID:
                            return cellOnlyInRow(opts, change, context);
                        default:
                            return undefined;
                    }
                }
            }
        }
    };
}

/*
 * Non-row nodes will be removed by slate but if all of the table's
 * children are invalids then we seed it with a basic structure.
 */
function onlyRowsInTable(opts: Options, change: Change, context: Object) {
    const invalids = context.node.nodes.filter(
        child => child.type !== opts.typeRow
    );

    if (invalids.size === context.node.nodes.size) {
        invalids.forEach(invalid =>
            change.removeNodeByKey(invalid.key, { normalize: false })
        );
        change.insertNodeByKey(context.node.key, 0, createRow(opts, 1), {
            normalize: false
        });
    }

    // No operations are made which means Slate will handle the normalization
    return undefined;
}

/*
 * A row's children must be cells.
 * If they're not then we wrap them within a cell.
 */
function onlyCellsInRow(opts: Options, change: Change, context: Object) {
    const cell = createCell(opts, []);
    const index = context.node.nodes.findIndex(
        child => child.key === context.child.key
    );
    change.insertNodeByKey(context.node.key, index, cell, { normalize: false });
    change.moveNodeByKey(context.child.key, cell.key, 0, { normalize: false });
}

/*
 * Rows can't live outside a table, if one is found then we wrap it within a table.
 */
function rowOnlyInTable(opts: Options, change: Change, context: Object) {
    return change.wrapBlockByKey(context.node.key, opts.typeTable);
}

/*
 * A cell's children must be "block"s.
 * If they're not then we wrap them within a block with a type of opts.typeContent
 */
function onlyBlocksInCell(opts: Options, change: Change, context: Object) {
    const block = Block.create({
        type: opts.typeContent
    });
    change.insertNodeByKey(context.node.key, 0, block, { normalize: false });

    const inlines = context.node.nodes.filter(node => node.object !== 'block');
    inlines.forEach((inline, index) => {
        change.moveNodeByKey(inline.key, block.key, index, {
            normalize: false
        });
    });
}

/*
 * Cells can't live outside a row, if one is found then we wrap it within a row.
 */
function cellOnlyInRow(opts: Options, change: Change, context: Object) {
    return change.wrapBlockByKey(context.node.key, opts.typeRow);
}

export default schema;
