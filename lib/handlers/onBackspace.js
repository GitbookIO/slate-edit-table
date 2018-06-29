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
    if (startOffset === 0 && isCollapsed && startBlockIndex === 0) {
        if (startBlock.isVoid) {
            // Delete the block normally if it is a void block
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
    // we clear the content of the cells.
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

    // If the cursor is at the very end of the first cell, ignore it.
    // If the cursor is at the very start of the last cell, ignore it.
    // This behavior is to compensate hanging selection behaviors:
    // https://github.com/ianstormtaylor/slate/pull/1605
    const ignoreFirstCell = value.selection
        .collapseToStart()
        .isAtEndOf(cells.first());
    const ignoreLastCell = value.selection
        .collapseToEnd()
        .isAtStartOf(cells.last());

    let cellsToClear = cells;
    if (ignoreFirstCell) {
        cellsToClear = cellsToClear.rest();
    }
    if (ignoreLastCell) {
        cellsToClear = cellsToClear.butLast();
    }

    // Clear all the selection
    cellsToClear.forEach(cell => clearCell(opts, change, cell));

    // Update the selection properly, and avoid reset of selection
    const updatedStartCell = change.value.document.getDescendant(
        cellsToClear.first().key
    );
    return change.collapseToStartOf(updatedStartCell);
}

export default onBackspace;
