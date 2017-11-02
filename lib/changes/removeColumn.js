const { List } = require('immutable');
const TablePosition = require('../TablePosition');

/**
 * Delete current column in a table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeColumn(opts, change, at) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    if (typeof at === 'undefined') {
        at = pos.getColumnIndex();
    }

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach((row) => {
            const cell = row.nodes.get(at);
            change.removeNodeByKey(cell.key);
        });

        // Update alignment
        let align = List(table.data.get('align'));
        align = align.delete(at);
        change.setNodeByKey(table.key, {
            data: table.data.set('align', align)
        });
    }
    // If last column, clear text in cells instead
    else {
        rows.forEach((row) => {
            row.nodes.forEach((cell) => {
                cell.nodes.forEach((node) => {
                    // We clear the texts in the cells
                    change.removeNodeByKey(node.key);
                });
            });
        });
    }

    // Replace the table
    return change;
}

module.exports = removeColumn;
