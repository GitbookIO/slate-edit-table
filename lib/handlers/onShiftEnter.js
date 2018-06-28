// @flow
import type { Change } from 'slate';
import type Options from '../options';

function onShiftEnter(
    event: *,
    change: Change,
    editor: *,
    opts: Options
): void | Change {
    return change.insertText('\n');
}

export default onShiftEnter;
