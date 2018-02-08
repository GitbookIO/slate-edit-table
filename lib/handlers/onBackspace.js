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
    const { state } = change;
    const { startBlock, startOffset, isCollapsed, endBlock } = state;

    // If a cursor is collapsed at the start of the block, do nothing
    if (startOffset === 0 && isCollapsed) {
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

    const { blocks, document } = state;
    const getAncestorCell = node =>
        document.getClosest(node.key, a => a.type === opts.typeCell);
    const cells = blocks.map(getAncestorCell).toSet();
    cells.forEach(cell => clearCell(opts, change, cell));

    // Clear selected cells
    return change.collapseToStartOf(startBlock);
}

export default onBackspace;
