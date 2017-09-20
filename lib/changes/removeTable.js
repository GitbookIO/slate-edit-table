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
    const { state } = change;
    const { startBlock } = state;

    const pos = TablePosition.create(state, startBlock);
    const { table } = pos;

    return change
        .removeNodeByKey(table.key);
}

module.exports = removeTable;
