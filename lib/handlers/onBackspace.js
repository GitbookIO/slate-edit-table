// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { clearCell } from '../changes';

function onBackspace(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    const { value } = change;
    const { startBlock, startOffset, isCollapsed, endBlock, document } = value;

    const cell = document.getParent(startBlock.key);
    const startBlockIndex = cell.nodes.findIndex(
        block => block.key == startBlock.key
    );

    // If a cursor is collapsed at the start of the first block, do nothing
    if (startOffset === 0 && isCollapsed) {
        if (startBlockIndex > 0) {
            // Normal deletion
            return undefined;
        }

        event.preventDefault();
        return change;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return undefined;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    const { blocks } = value;
    const getAncestorCell = node =>
        node.type === opts.typeCell
            ? node
            : document.getClosest(node.key, a => a.type === opts.typeCell);
    const cells = blocks.map(getAncestorCell).toSet();
    cells.forEach(block => clearCell(opts, change, block));

    // Clear selected cells
    return change.collapseToStartOf(startBlock);
}

export default onBackspace;
