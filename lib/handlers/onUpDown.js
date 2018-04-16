// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import { moveSelectionBy } from '../changes';
import type Options from '../options';

function onUpDown(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    const { value } = change;
    const direction = event.key === 'ArrowUp' ? -1 : +1;
    const pos = TablePosition.create(opts, value.document, value.startKey);

    if (
        (pos.isFirstRow() && direction === -1) ||
        (pos.isLastRow() && direction === +1)
    ) {
        // Let the default behavior move out of the table
        return undefined;
    }
    event.preventDefault();

    moveSelectionBy(opts, change, 0, event.key === 'ArrowUp' ? -1 : +1);

    return change;
}

export default onUpDown;
