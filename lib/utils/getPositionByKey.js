// @flow
import { type Node } from 'slate';

import type Options from '../options';

import TablePosition from './TablePosition';

/**
 * The position of the selection start block, in the current table
 */
function getPositionByKey(
    opts: Options,
    // The current value
    containerNode: Node,
    // Key of the node in desired position
    key: string
): TablePosition {
    return TablePosition.create(opts, containerNode, key);
}

export default getPositionByKey;
