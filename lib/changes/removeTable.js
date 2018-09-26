// @flow
import { type Change } from 'slate';

import type Options from '../options';
import removeTableByKey from './removeTableByKey';

/**
 * Delete the whole table at position
 */
function removeTable(opts: Options, change: Change): Change {
    const { value } = change;
    const { selection } = value;

    return removeTableByKey(opts, change, selection.start.key);
}

export default removeTable;
