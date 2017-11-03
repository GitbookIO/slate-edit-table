/* @flow */

import Options, { type OptionsFormat } from './options';
import ALIGN from './ALIGN';
import schemaPlugin from './schemaPlugin';
import onKeyDown from './onKeyDown';

/**
 *  Returns the full plugin object (behavior + rendering + schema)
 */
function EditTable(
    // The plugin options
    optionsParam?: OptionsFormat
): Object {
    const opts = new Options(optionsParam || {});
    const schemaPluginInstance = schemaPlugin(opts);

    return {
        ...schemaPluginInstance,

        onKeyDown: onKeyDown.bind(null, opts)
    };
}

// Expose align constants to the plugin
EditTable.ALIGN = ALIGN;

export default EditTable;
