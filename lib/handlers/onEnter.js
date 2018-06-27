// @flow
import { type Change } from 'slate';

import type Options from '../options';
import { TablePosition } from '../utils';
import { insertRow } from '../changes';

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    event.preventDefault();
    const { selection, document } = change.value;
    const pos = TablePosition.create(opts, document, selection.startKey);

    if (
        !selection.hasFocusAtStartOf(pos.cell) &&
        !selection.hasFocusAtEndOf(pos.cell)
    ) {
        return undefined;
    }

    if (event.shiftKey) {
        return change
            .splitBlock()
            .setBlocks({ type: opts.typeContent, data: {} });
    }

    return insertRow(opts, change);
}

export default onEnter;
