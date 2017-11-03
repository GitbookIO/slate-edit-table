// @flow

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

                normalize: (
                    change: Change,
                    reason: string,
                    context: any
                ): any => {
                    switch (reason) {
                        case 'child_kind_invalid':
                            // Unwrap blocks in cells to keep only inlines
                            return context.child.nodes.forEach(blockChild =>
                                change.unwrapNodeByKey(blockChild.key)
                            );
                        default:
                    }
                }
            }
        }
    };
}

export default schema;
