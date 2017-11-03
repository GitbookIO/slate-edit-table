// @flow
import { type Change } from 'slate';

import TablePosition from '../TablePosition';
import moveSelectionBy from '../changes/moveSelectionBy';
import type Options from '../options';

function onUpDown(event: *, change: Change, opts: Options): void | Change {
    const direction = event.key === 'UpArrow' ? -1 : +1;
    const pos = TablePosition.create(change.value, change.value.startBlock);

    if (
        (pos.isFirstRow() && direction === -1) ||
        (pos.isLastRow() && direction === +1)
    ) {
        // Let the default behavior move out of the table
        return undefined;
    }
    event.preventDefault();

    moveSelectionBy(opts, change, 0, event.key === 'UpArrow' ? -1 : +1);

    return change;
}

export default onUpDown;
