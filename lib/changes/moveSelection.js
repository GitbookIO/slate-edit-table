const TablePosition = require('../TablePosition');

/**
 * Move selection to {x,y}
 *
 * @param {Options} opts The plugin options
 * @param {Slate.Change} change
 * @param {Number} x
 * @param {Number} y
 * @return {Slate.Change}
 */
function moveSelection(opts, change, x, y) {
    const { value } = change;
    let { startBlock, startOffset } = value;

    if (startBlock.type !== opts.typeCell) {
        throw new Error('moveSelection can only be applied from within a cell');
    }

    const pos = TablePosition.create(value, startBlock);
    const { table } = pos;

    const row  = table.nodes.get(y);
    const cell = row.nodes.get(x);

    // Calculate new offset
    if (startOffset > cell.text.length) {
        startOffset = cell.text.length;
    }

    return change
        .collapseToEndOf(cell)
        .moveOffsetsTo(startOffset);
}

module.exports = moveSelection;
