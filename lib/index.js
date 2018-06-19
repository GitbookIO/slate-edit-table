/* @flow */

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

        onKeyDown: onKeyDown.bind(null, opts)
    };
}

export type TablePosition = _TablePosition;

export default EditTable;
