// @flow
import { type Change, type Node } from 'slate';
import PluginEditTable from '../lib/';

/*
 * This file contains an example of cell align management extension.
 */

const tablePlugin = PluginEditTable({
    typeTable: 'table',
    typeRow: 'table_row',
    typeCell: 'table_cell',
    typeContent: 'paragraph'
});

/*
 * Set align data for the current column
 */
function setColumnAlign(change: Change, align: string): Change {
    const pos = tablePlugin.utils.getPosition(change.state);
    const columnCells = tablePlugin.utils.getCellsAtColumn(
        pos.table,
        pos.getColumnIndex()
    );
    columnCells.forEach(cell => {
        change.setNodeByKey(cell.key, { data: { align } });
    });
    return change;
}

const alignPlugin = {
    schema: {
        rules: [
            // Enforce cells to have alignment data
            {
                match(node: Node) {
                    return node.kind == 'block' && node.type == 'table_cell';
                },
                validate(cell: Node) {
                    return (
                        ['left', 'center', 'right'].indexOf(
                            cell.data.get('align')
                        ) === -1
                    );
                },
                normalize(change: Change, cell: Node) {
                    return change.setNodeByKey(cell.key, {
                        data: {
                            align: 'left'
                        }
                    });
                }
            }
        ]
    },

    changes: {
        setColumnAlign
    }
};

export default alignPlugin;
