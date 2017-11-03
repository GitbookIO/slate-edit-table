// @flow
import { type Change } from 'slate';
import type Options from '../options';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts: Options): Object {
    return {
        blocks: {
            [opts.typeCell]: {
                nodes: [{ kinds: ['text', 'inline'] }],
                parent: { types: [opts.typeRow] },

                normalize: normalize({
                    child_kind_invalid: (change, context) =>
                        // Unwrap blocks in cells to keep only inlines
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
