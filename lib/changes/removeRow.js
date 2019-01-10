// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';
import removeRowByKey from './removeRowByKey';

/**
 * Remove current row in a table. Clear it if last remaining row
 */
function removeRow(opts: Options, editor: Change, at: number): Change {
    const { value } = editor;
    const { selection } = value;

    const pos = TablePosition.create(opts, value.document, selection.start.key);

    let rowKey;
    if (typeof at === 'undefined') {
        rowKey = pos.row.key;
    } else {
        rowKey = pos.table.nodes.get(at).key;
    }

    return removeRowByKey(opts, editor, rowKey);
}

export default removeRow;
