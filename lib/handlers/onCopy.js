/* @flow */
import { cloneFragment, type Editor } from '@gitbook/slate-react';
import { type Change } from '@gitbook/slate';

import type Options from '../options';
import { getCopiedFragment } from '../utils';

/**
 *  Handle copying content of tables
 */
function onCopy(
    // The plugin options
    opts?: Options,
    event: *,
    change: Change,
    editor: Editor
): Object {
    const copiedFragment = getCopiedFragment(opts, change.value);

    if (!copiedFragment) {
        // Default copy behavior
        return null;
    }

    // Override default onCopy
    cloneFragment(event, change.value, copiedFragment);
    return true;
}

export default onCopy;
