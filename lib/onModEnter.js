const Slate = require('slate');
const TablePosition = require('./TablePosition');

/**
 * Exit the current table, by inserting a default block after the table.
 */
function onModEnter(event, change, opts) {
    const { value } = change;
    if (!value.isCollapsed) {
        return;
    }

    event.preventDefault();

    const exitBlock = Slate.Block.create({
        type: opts.exitBlockType,
        nodes: [Slate.Text.create('')]
    });

    const cell = value.startBlock;
    const table = TablePosition.create(value, cell).table;
    const tableParent = value.document.getParent(table.key);
    const insertionIndex = tableParent.nodes.indexOf(table) + 1;

    return change
    .insertNodeByKey(tableParent.key, insertionIndex, exitBlock)
    .collapseToStartOf(exitBlock);
}

module.exports = onModEnter;
