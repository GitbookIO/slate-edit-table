// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import { createAlign } from '../helpers';

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
    const { state } = change;
    const { startKey } = state;

    const pos = TablePosition.create(opts, state.document, startKey);
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
