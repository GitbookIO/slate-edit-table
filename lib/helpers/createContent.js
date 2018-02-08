// @flow
import { Block, Text } from 'slate';

import type Options from '../options';

/**
 * Create a new default content block
 */
function createContent(opts: Options, text?: string = ''): Block {
    return Block.create({
        type: opts.typeContent,
        nodes: [
            Text.fromJSON({
                kind: 'text',
                text
            })
        ]
    });
}

export default createContent;
