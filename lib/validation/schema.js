// @flow

import { Block, type Change } from 'slate';
import {
    CHILD_OBJECT_INVALID,
    CHILD_TYPE_INVALID,
    PARENT_TYPE_INVALID,
} from './slate-schema-violations';
import { createCell } from '../utils';
import type Options from '../options';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.typeTable]: {
                nodes: [{ match: { type: opts.typeRow } }],
            },
            [opts.typeRow]: {
                nodes: [{ match: { type: opts.typeCell } }],
                parent: { type: opts.typeTable },
                normalize(change: Change, error) {
                    switch (error.code) {
                        case CHILD_TYPE_INVALID:
                            return onlyCellsInRow(opts, change, error);
                        case PARENT_TYPE_INVALID:
                            return rowOnlyInTable(opts, change, error);
                        default:
                            return undefined;
                    }
                },
            },
            [opts.typeCell]: {
                nodes: [{ match: { object: 'block' } }],
                parent: { type: opts.typeRow },
                normalize(change: Change, error) {
                    switch (error.code) {
                        case CHILD_OBJECT_INVALID:
                            return onlyBlocksInCell(opts, change, error.node);
                        case PARENT_TYPE_INVALID:
                            return cellOnlyInRow(opts, change, error);
                        default:
                            return undefined;
                    }
                },
            },
        },
    };
}

/*
 * A row's children must be cells.
 * If they're not then we wrap them within a cell.
 */
function onlyCellsInRow(opts: Options, change: Change, error) {
    const cell = createCell(opts, []);
    const index = error.node.nodes.findIndex(
        child => child.key === error.child.key,
    );

    change.withoutNormalizing(() => {
        change.insertNodeByKey(error.node.key, index, cell);
        change.moveNodeByKey(error.child.key, cell.key, 0);
    });
}

/*
 * Rows can't live outside a table, if one is found then we wrap it within a table.
 */
function rowOnlyInTable(opts: Options, change: Change, error: Object) {
    return change.wrapBlockByKey(error.node.key, opts.typeTable);
}

/*
 * A cell's children must be "block"s.
 * If they're not then we wrap them within a block with a type of opts.typeContent
 */
function onlyBlocksInCell(opts: Options, change: Change, node: Object) {
    change.wrapBlockByKey(node.nodes.first().key, opts.typeContent);
    const wrapper = change.value.document.getDescendant(node.key).nodes.first();

    // Add in the remaining items
    node.nodes
        .rest()
        .forEach((child, index) =>
            change.moveNodeByKey(child.key, wrapper.key, index + 1),
        );

    return change;
    /*     const block = Block.create({
        type: opts.typeContent,
    });
    change.withoutNormalizing(() => {
        change.insertNodeByKey(error.node.key, 0, block);
        const inlines = error.node.nodes.filter(
            node => node.object !== 'block',
        );
        inlines.forEach((inline, index) => {
            change.moveNodeByKey(inline.key, block.key, index);
        });
    }); */
}

/*
 * Cells can't live outside a row, if one is found then we wrap it within a row.
 */
function cellOnlyInRow(opts: Options, change: Change, error: Object) {
    return change.wrapBlockByKey(error.node.key, opts.typeRow);
}

export default schema;
