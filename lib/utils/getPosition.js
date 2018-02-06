// @flow
import { type State } from 'slate';

import type Options from '../options';

import TablePosition from './TablePosition';
import isSelectionInTable from './isSelectionInTable';

/**
 * The position of the selection start block, in the current table
 * @throws {Error} If the start of the selection is not in a table
 */
function getPosition(
    opts: Options,
    // The current state
    state: State
): TablePosition {
    if (!isSelectionInTable(opts, state)) {
        throw new Error('Not in a table');
    }
    const cell = state.startBlock;
    return TablePosition.create(state, cell);
}

export default getPosition;
