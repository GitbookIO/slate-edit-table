import { TablePosition, createRow } from '../utils';

/**
 * Insert a new row in current table
 */
function insertRow(
    opts,
    editor,
    at, // row index
    getRow, // Generate the row yourself
) {
    const { value } = editor;
    const { selection } = value;

    const pos = TablePosition.create(opts, value.document, selection.start.key);
    const { table } = pos;

    // Create a new row with the right count of cells
    const columns = table.nodes.get(0).nodes.size;
    const newRow = getRow ? getRow(columns) : createRow(opts, columns);

    if (typeof at === 'undefined') {
        at = pos.getRowIndex() + 1;
    }

    return editor
        .insertNodeByKey(table.key, at, newRow)
        .moveToEndOfNode(newRow.nodes.get(pos.getColumnIndex()));
}

export default insertRow;
