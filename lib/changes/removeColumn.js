// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import removeColumnByKey from './removeColumnByKey';

import type Options from '../options';

/**
 * Delete current column in a table
 */
function removeColumn(opts: Options, change: Change, at: number): Change {
    const { value } = change;
    const { selection } = value;

    const pos = TablePosition.create(opts, value.document, selection.start.key);

    let columnKey;
    if (typeof at === 'undefined') {
        columnKey = pos.cell.key;
    } else {
        columnKey = pos.row.nodes.get(at).key;
    }

    return removeColumnByKey(opts, change, columnKey);
}

export default removeColumn;
