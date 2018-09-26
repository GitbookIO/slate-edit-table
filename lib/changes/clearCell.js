// @flow
import { Block, type Change } from 'slate';

import type Options from '../options';

/**
 * Clear the content of the given cell
 */
function clearCell(opts: Options, change: Change, cell: Block): Change {
    const newBlock = Block.create({ type: opts.typeContent });
    const { nodes } = cell;

    // Insert a new empty node
    change.withoutNormalizing(() => {
        change.insertNodeByKey(cell.key, 0, newBlock);
    });

    // Remove all previous nodes
    nodes.forEach(node => {
        change.removeNodeByKey(node.key);
    });

    return change;
}

export default clearCell;
