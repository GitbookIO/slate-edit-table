// @flow

import type { Node, Range } from '@gitbook/slate';

import TablePosition from './TablePosition';
import type Options from '../options';

/**
 * True if the given range is inside one table
 */
function isRangeInTable(opts: Options, node: Node, range: Range): boolean {
    const { startKey, endKey } = range;
    const startPosition = TablePosition.create(opts, node, startKey);
    const endPosition = TablePosition.create(opts, node, endKey);

    // Only handle events in tables
    if (!startPosition.isInTable() || !endPosition.isInTable()) {
        return false;
    }

    // Inside the same table
    return startPosition.table === endPosition.table;
}

export default isRangeInTable;
