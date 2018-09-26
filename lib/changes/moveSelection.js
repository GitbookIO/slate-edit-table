// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Move selection to {x,y}
 */
function moveSelection(
    opts: Options,
    change: Change,
    x: number,
    y: number
): Change {
    const { value } = change;
    const { selection } = value;
    const pos = TablePosition.create(opts, value.document, selection.start.key);

    if (!pos.isInCell()) {
        throw new Error('moveSelection can only be applied from within a cell');
    }

    const { table } = pos;
    const row = table.nodes.get(y);
    const cell = row.nodes.get(x);

    return change.moveToStartOfNode(cell);
}

export default moveSelection;
