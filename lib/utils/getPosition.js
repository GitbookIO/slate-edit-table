// @flow
import { type Value } from 'slate';

import type Options from '../options';

import TablePosition from './TablePosition';

/**
 * The position of the selection start block, in the current table
 */
function getPosition(
    opts: Options,
    // The current value
    value: Value,
    key: ?string = value.startKey
): TablePosition {
    return TablePosition.create(opts, value.document, key);
}

export default getPosition;
