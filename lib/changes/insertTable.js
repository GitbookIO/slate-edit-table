const createTable = require('../createTable');

/**
 * Insert a new table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Change}
 */
function insertTable(opts, change, columns = 2, rows = 2) {
    const { value } = change;

    if (!value.selection.startKey) return false;

    // Create the table node
    const fillWithEmptyText = (x, y) => '';
    const table = createTable(opts, columns, rows, fillWithEmptyText);

    return change
        .insertBlock(table);
}

module.exports = insertTable;
