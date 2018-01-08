// @flow
import { Block, Text } from 'slate';

/**
 * Create a new cell
 */
function createCell(type: string, text?: string = ''): Block {
    return Block.create({
        type,
        nodes: [
            Text.fromJSON({
                object: 'text',
                text
            })
        ]
    });
}

export default createCell;
