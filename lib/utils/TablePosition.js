// @flow
import { Record } from 'immutable';
import { Block, type State, type Node } from 'slate';

import type Options from '../options';

class TablePosition extends Record({
    tableBlock: null,
    rowBlock: null,
    cellBlock: null
}) {
    // Block container for the table
    tableBlock: ?Block;

    // Block for current row
    rowBlock: ?Block;

    // Block for current cell
    cellBlock: ?Block;

    /**
     * Create a new instance of a TablePosition from a Slate state
     * and a current cell.
     */
    static create(opts: Options, state: State, node: Node): TablePosition {
        const { document } = state;
        const { key } = node;
        const cell = document.getClosest(key, p => p.type === opts.typeCell);
        const row = document.getClosest(key, p => p.type === opts.typeRow);
        const table = document.getClosest(key, p => p.type === opts.typeTable);

        return new TablePosition({
            table,
            row,
            cell
        });
    }

    get table(): Block {
        if (!this.tableBlock) {
            throw new Error('Not in a table');
        }
        return this.tableBlock;
    }

    get row(): Block {
        if (!this.rowBlock) {
            throw new Error('Not in a table');
        }
        return this.rowBlock;
    }

    get cell(): Block {
        if (!this.cellBlock) {
            throw new Error('Not in a table');
        }
        return this.cellBlock;
    }

    /**
     * Check to see if this position is within a cell
     */
    isInCell(): boolean {
        return Boolean(this.cellBlock);
    }

    /**
     * Get count of columns
     */
    getWidth(): number {
        const { table } = this;
        const rows = table.nodes;
        const cells = rows.get(0).nodes;

        return cells.size;
    }

    /**
     * Get count of rows
     */
    getHeight(): number {
        const { table } = this;
        const rows = table.nodes;

        return rows.size;
    }

    /**
     * Get index of current row in the table.
     */
    getRowIndex(): number {
        const { table, row } = this;
        const rows = table.nodes;

        return rows.findIndex(x => x === row);
    }

    /**
     * Get index of current column in the row.
     */
    getColumnIndex(): number {
        const { row, cell } = this;
        const cells = row.nodes;

        return cells.findIndex(x => x === cell);
    }

    /**
     * True if on first cell of the table
     */
    isFirstCell(): boolean {
        return this.isFirstRow() && this.isFirstColumn();
    }

    /**
     * True if on last cell of the table
     */
    isLastCell(): boolean {
        return this.isLastRow() && this.isLastColumn();
    }

    /**
     * True if on first row
     */
    isFirstRow(): boolean {
        return this.getRowIndex() === 0;
    }

    /**
     * True if on last row
     */
    isLastRow(): boolean {
        return this.getRowIndex() === this.getHeight() - 1;
    }

    /**
     * True if on first column
     */
    isFirstColumn(): boolean {
        return this.getColumnIndex() === 0;
    }

    /**
     * True if on last column
     */
    isLastColumn(): boolean {
        return this.getColumnIndex() === this.getWidth() - 1;
    }
}

export default TablePosition;
