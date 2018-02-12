// @flow
import { type State } from 'slate';

import type Options from '../options';

import TablePosition from './TablePosition';

/**
 * The position of the selection start block, in the current table
 */
function getPosition(
    opts: Options,
    // The current state
    state: State
): TablePosition {
    return TablePosition.create(opts, state.document, state.startKey);
}

export default getPosition;
