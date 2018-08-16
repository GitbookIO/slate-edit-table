// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import { moveSelectionBy, insertRow } from '../changes';
import type Options from '../options';

/**
 * Select all text of current block.
 */
function selectAllText(change: Change): Change {
    const { value } = change;
    const { startBlock } = value;

    return change.moveTo(0).moveFocusForward(startBlock.text.length);
}

/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */
function onTab(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    event.preventDefault();
    const direction = event.shiftKey ? -1 : +1;

    // Create new row if needed
    const { document, selection } = change.value;
    const pos = TablePosition.create(opts, document, selection.start.key);
    if (pos.isFirstCell() && direction === -1) {
        insertRow(opts, change, 0);
    } else if (pos.isLastCell() && direction === 1) {
        insertRow(opts, change);
    }

    // Move back to initial cell (insertRow moves selection automatically).
    change.select(selection);

    // Move
    moveSelectionBy(opts, change, direction, 0);

    // Select all cell.
    return selectAllText(change);
}

export default onTab;
