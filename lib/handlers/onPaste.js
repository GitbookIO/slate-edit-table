/* @flow */
import { getEventTransfer, type Editor } from '@gitbook/slate-react';
import { Range, type Change } from '@gitbook/slate';

import type Options from '../options';
import { isSelectionInTable, isRangeInTable } from '../utils';
import { insertTableFragmentAtRange } from '../changes';

/**
 *  Handle pasting inside tables
 */
function onPaste(
    // The plugin options
    opts?: Options,
    event: *,
    change: Change,
    editor: Editor
): Object {
    // Outside of tables, do not alter paste behavior
    if (!isSelectionInTable(opts, change.value)) {
        return undefined;
    }

    const transfer = getEventTransfer(event);
    const { type, fragment } = transfer;

    if (type != 'fragment' || fragment.nodes.isEmpty()) {
        return null;
    }

    if (
        !isRangeInTable(
            opts,
            fragment,
            Range.create({
                anchorKey: fragment.getFirstText().key,
                focusKey: fragment.getLastText().key
            })
        )
    ) {
        return null;
    }

    return insertTableFragmentAtRange(
        opts,
        change,
        change.value.selection,
        fragment
    );
}

export default onPaste;
