// @flow
import { type Change } from 'slate';

import TablePosition from '../TablePosition';
import ALIGN from '../ALIGN';
import createAlign from '../createAlign';
import type Options from '../options';

/**
 * Sets column alignment for a given column
 */
function setColumnAlign(
    opts: Options,
    change: Change,
    align: string = ALIGN.DEFAULT,
    at: number
): Change {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    // Figure out column position
    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const newAlign = createAlign(pos.getWidth(), table.data.get('align'));
    newAlign[at] = align;

    change.setNodeByKey(table.key, {
        data: table.data.set('align', newAlign)
    });

    return change;
}

export default setColumnAlign;
