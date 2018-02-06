// @flow

import type Options from '../options';
import rules from './rules';

/*
 * Returns a schema definition for the plugin
 */
function schema(opts: Options): Object {
    return {
        rules: rules(opts)
    };
}

export default schema;
