const Slate = require('slate');
const TablePosition = require('./TablePosition');

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(event, change, opts) {
    const { state } = change;
    if (!state.isCollapsed) {
        return;
    }

    event.preventDefault();

    const exitBlock = Slate.Block.create({
        type: opts.exitBlockType,
        nodes: [Slate.Text.create('')]
    });

    const cell = state.startBlock;
    const table = TablePosition.create(state, cell).table;
    const tableParent = state.document.getParent(table.key);
    const insertionIndex = tableParent.nodes.indexOf(table) + 1;

    return change
    .insertNodeByKey(tableParent.key, insertionIndex, exitBlock)
    .collapseToStartOf(exitBlock);
}

module.exports = onModEnter;
