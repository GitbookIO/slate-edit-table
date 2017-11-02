const TablePosition = require('../TablePosition');

/**
 * Delete the whole table
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} at
 * @return {Slate.Change}
 */
function removeTable(opts, change, at) {
    const { value } = change;
    const { startBlock } = value;

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    return change
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
