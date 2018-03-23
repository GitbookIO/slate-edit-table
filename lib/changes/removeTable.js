// @flow
import { Block, Text, type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Delete the whole table at position
 */
function removeTable(opts: Options, change: Change): Change {
    const { value } = change;
    const { startKey } = value;

    const pos = TablePosition.create(opts, value.document, startKey);
    const { table } = pos;
    const { document } = change.value;
    let nextFocusBlock = null;
    let shouldCollapseToEnd = false;

    const nextBlock = change.value.document.getNextBlock(table.key);
    if (nextBlock) {
        nextFocusBlock = nextBlock;
    } else {
        const prevBlock = change.value.document.getPreviousBlock(table.key);
        if (prevBlock) {
            nextFocusBlock = prevBlock;
            shouldCollapseToEnd = true;
        } else if (opts.exitBlockType) {
            nextFocusBlock = Block.create({
                type: opts.exitBlockType,
                nodes: [Text.create('')]
            });
            const tableParent = document.getParent(table.key);
            const insertionIndex = tableParent.nodes.indexOf(table) + 1;
            change.insertNodeByKey(
                tableParent.key,
                insertionIndex,
                nextFocusBlock
            );
        }
    }

    change.removeNodeByKey(table.key);
    if (!nextFocusBlock) {
        return change;
    }
    if (shouldCollapseToEnd) {
        change.collapseToEndOf(nextFocusBlock).focus();
    } else {
        change.collapseToStartOf(nextFocusBlock).focus();
    }
    return change;
}

export default removeTable;
