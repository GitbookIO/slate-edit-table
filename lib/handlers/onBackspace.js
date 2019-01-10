// @flow

import { type Change } from 'slate';

import type Options from '../options';
import { clearCell } from '../changes';

function onBackspace(opts: Options, event: *, editor: Change, next: () => {}) {
    const { value } = editor;
    const { startBlock, selection, endBlock, document } = value;
    const { isCollapsed } = selection;

    const startCell = document.getClosest(startBlock.key, opts.isCell);
    const endCell = document.getClosest(endBlock.key, opts.isCell);

    const startBlockIndex = startCell.nodes.findIndex(
        block => block.key == startBlock.key,
    );

    // If a cursor is collapsed at the start of the first block, do nothing
    if (selection.start.offset === 0 && isCollapsed && startBlockIndex === 0) {
        if (editor.isVoid(startBlock)) {
            // Delete the block normally if it is a void block
            return next();
        }

        event.preventDefault();
        return editor;
    }

    // If "normal" deletion, we continue
    if (startCell === endCell) {
        return next();
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
                          a => a.type === opts.typeCell,
                      ),
        )
        .toSet();

    // If the cursor is at the very end of the first cell, ignore it.
    // If the cursor is at the very start of the last cell, ignore it.
    // This behavior is to compensate hanging selection behaviors:
    // https://github.com/ianstormtaylor/slate/pull/1605
    const ignoreFirstCell = value.selection
        .moveToStart()
        .anchor.isAtEndOfNode(cells.first());
    const ignoreLastCell = value.selection
        .moveToEnd()
        .anchor.isAtStartOfNode(cells.last());

    let cellsToClear = cells;
    if (ignoreFirstCell) {
        cellsToClear = cellsToClear.rest();
    }
    if (ignoreLastCell) {
        cellsToClear = cellsToClear.butLast();
    }

    // Clear all the selection
    cellsToClear.forEach(cell => clearCell(opts, editor, cell));

    // Update the selection properly, and avoid reset of selection
    const updatedStartCell = value.document.getDescendant(
        cellsToClear.first().key,
    );
    return editor.moveToStartOfNode(updatedStartCell);
}

export default onBackspace;
