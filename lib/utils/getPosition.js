// @flow
import { type Value } from 'slate';

import type Options from '../options';

import TablePosition from './TablePosition';
import isSelectionInTable from './isSelectionInTable';

/**
 * The position of the selection start block, in the current table
 * @throws {Error} If the start of the selection is not in a table
 */
function getPosition(
    opts: Options,
    // The current value
    value: Value
): TablePosition {
    if (!isSelectionInTable(opts, value)) {
        throw new Error('Not in a table');
    }
    const cell = value.startBlock;
    return TablePosition.create(value, cell);
}

export default getPosition;
