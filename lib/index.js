/* @flow */
import { cloneFragment, type Editor } from 'slate-react';
import { type Change } from 'slate';
import Options, { type OptionsFormat } from './options';
import type { TablePosition as _TablePosition } from './utils/TablePosition';
import core from './core';
import { onKeyDown } from './handlers';

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function EditTable(
    // The plugin options
    optionsParam?: OptionsFormat
): Object {
    const opts = new Options(optionsParam || {});
    const corePlugin = core(opts);

    return {
        ...corePlugin,

        onKeyDown: onKeyDown.bind(null, opts),
        onCopy: (event: *, change: Change, editor: Editor) => {
            const copiedFragment = corePlugin.utils.getCopiedFragment(
                change.value
            );

            if (!copiedFragment) {
                // Default copy behavior
                return null;
            }

            // Override default onCopy
            cloneFragment(event, change.value, copiedFragment);
            return true;
        }
    };
}

export type TablePosition = _TablePosition;

export default EditTable;
