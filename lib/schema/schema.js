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

                    parent_type_invalid: (change, context) =>
                        change.wrapBlockByKey(context.node.key, opts.typeRow, {
                            normalize: false
                        })
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
