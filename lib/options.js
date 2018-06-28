// @flow

import { Record } from 'immutable';
import type { Node } from 'slate';

export type OptionsFormat = {
    typeTable?: string,
    typeRow?: string,
    typeCell?: string,
    typeContent?: string,
    exitBlockType?: string
};

/**
 * The plugin options
 */
class Options extends Record({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeContent: 'paragraph',
    exitBlockType: 'paragraph'
}) {
    // The type of table blocks
    typeTable: string;
    // The type of row blocks
    typeRow: string;
    // The type of cell blocks
    typeCell: string;
    // The default type for blocks in cells
    typeContent: string;
    // The type of block inserted when exiting
    exitBlockType: string;

    /*
     * Return a node filter to find a cell.
     */
    isCell = (node: Node): boolean =>
        node.object == 'block' && node.type == this.typeCell;
}

export default Options;
