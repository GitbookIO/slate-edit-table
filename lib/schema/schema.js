// @flow
import { type Change } from 'slate';

import createAlign from '../createAlign';
import type Options from '../options';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.typeTable]: {
                nodes: [{ types: [opts.typeRow], min: 1 }],
                normalize: (change, reason, context) => {
                    console.log('TABLE REASON', reason);
                    console.log(JSON.stringify(change.value.document, null, 2));
                }
            },

            [opts.typeRow]: {
                // nodes: [{ types: [opts.typeCell] }],
                parent: { types: [opts.typeTable] },

                normalize: normalize({
                    parent_type_invalid: (change, context) => {
                        const row = context.node;
                        change.wrapBlockByKey(
                            row.key,
                            {
                                type: opts.typeTable,
                                data: {
                                    align: createAlign(row.nodes.size)
                                }
                            },
                            { normalize: false }
                        );
                    }
                })
            },

            [opts.typeCell]: {
                nodes: [{ kinds: ['text', 'inline'] }],
                parent: { types: [opts.typeRow] },

                normalize: normalize({
                    child_kind_invalid: (change, context) =>
                        // Unwrap blocks in cells to keep only inlines and texts
                        context.child.nodes.forEach(blockChild =>
                            change.unwrapNodeByKey(blockChild.key)
                        ),

                    parent_type_invalid: (change, context) => {
                        console.log(
                            'CELL PARENT'
                            // JSON.stringify(context.parent.toJSON(), null, 2)
                        );
                        console.log(
                            'CELL CHILD'
                            // JSON.stringify(context.node.toJSON(), null, 2)
                        );
                        console.log(
                            JSON.stringify(
                                change.value.document.toJSON(),
                                null,
                                2
                            )
                        );
                        change.wrapBlockByKey(context.node.key, opts.typeRow, {
                            normalize: false
                        });
                    }
                })
            }
        }
    };
}

/*
 * Allows to define a normalize function through a keyed collection of functions
 */
function normalize(reasons: { [string]: (Change, context: any) => any }): * {
    return (change: Change, reason: string, context: any): any => {
        const reasonFn = reasons[reason];
        if (reasonFn) {
            reasonFn(change, context);
        }
    };
}

export default schema;
