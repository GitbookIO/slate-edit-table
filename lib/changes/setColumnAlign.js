// @flow
import { type Change } from 'slate';

import { TablePosition, createAlign } from '../utils';
import ALIGN from '../ALIGN';
import type Options from '../options';
import setTableAlign from './setTableAlign';

/**
 * Sets column alignment for a given column
 */
function setColumnAlign(
    opts: Options,
    change: Change,
    cellAlign: string = ALIGN.DEFAULT,
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

    const newAlign = createAlign(pos.getWidth(), table.data.get('presetAlign'));
    newAlign[at] = cellAlign;
    return setTableAlign(opts, change, table, newAlign);
}

export default setColumnAlign;
