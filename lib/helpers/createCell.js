// @flow
import { Block } from 'slate';

import createContent from './createContent';
import type Options from '../options';

/**
 * Create a new cell
 */
function createCell(opts: Options, text?: string = ''): Block {
    return Block.create({
        type: opts.typeCell,
        nodes: [createContent(opts, text)]
    });
}

export default createCell;
