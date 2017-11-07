// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Delete the whole table at position
 */
function removeTable(opts: Options, change: Change): Change {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    return change.removeNodeByKey(table.key);
}

export default removeTable;
