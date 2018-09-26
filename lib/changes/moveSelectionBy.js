// @flow
import { type Change } from 'slate';

import { TablePosition } from '../utils';
import type Options from '../options';

/**
 * Move selection by a {x,y} relative movement
 */
function moveSelectionBy(
    opts: Options,
    change: Change,
    x: number, //  Move horizontally by x
    y: number // Move vertically by y
): Change {
    const { value } = change;
    const { selection } = value;
    const pos = TablePosition.create(opts, value.document, selection.start.key);
    if (!pos.isInCell()) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    const rowIndex = pos.getRowIndex();
    const colIndex = pos.getColumnIndex();
    const width = pos.getWidth();
    const height = pos.getHeight();

    const [absX, absY] = normPos(x + colIndex, y + rowIndex, width, height);
    const isGoingUp = y < 0;

    if (absX === -1) {
        // Out of table
        return change;
    }

    const { table } = pos;
    const row = table.nodes.get(absY);
    const cell = row.nodes.get(absX);

    if (isGoingUp) {
        change.moveToEndOfNode(cell);
    } else {
        change.moveToStartOfNode(cell);
    }

    return change;
}

/**
 * Normalize position in a table. If x is out of the row, update y accordingly.
 * Returns [-1, -1] if the new selection is out of table
 */
function normPos(
    x: number,
    y: number,
    width: number,
    height: number
): number[] {
    if (x < 0) {
        x = width - 1;
        y -= 1;
    }

    if (y < 0) {
        return [-1, -1];
    }

    if (x >= width) {
        x = 0;
        y += 1;
    }

    if (y >= height) {
        return [-1, -1];
    }

    return [x, y];
}

export default moveSelectionBy;
