// @flow
import { type Change } from 'slate';

import type Options from '../options';
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

    return insertRow(opts, change);
}

export default onEnter;
