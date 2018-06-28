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

    const startCell = document.getClosest(startBlock.key, opts.isCell);
    const endCell = document.getClosest(endBlock.key, opts.isCell);

    const startBlockIndex = startCell.nodes.findIndex(
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
    if (startCell === endCell) {
        return undefined;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    const { blocks } = value;

    // Get all cells that contains the selection
    const cells = blocks
        .map(
            node =>
                node.type === opts.typeCell
                    ? node
                    : document.getClosest(
                          node.key,
                          a => a.type === opts.typeCell
                      )
        )
        .toSet();

    // Clear all the selection
    cells.forEach(block => clearCell(opts, change, block));

    // Update the selection to avoid reset of selection
    const updatedCell = change.value.document.getDescendant(cells.last().key);
    return change.collapseToStartOf(updatedCell);
}

export default onBackspace;
