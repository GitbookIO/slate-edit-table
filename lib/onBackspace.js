const Slate = require('slate');

function onBackspace(event, data, change, opts) {
    const { state } = change;
    const { startBlock, startOffset,
        isCollapsed, endBlock } = state;

    // If a cursor is collapsed at the start of the block, do nothing
    if (startOffset === 0 && isCollapsed) {
        event.preventDefault();
        return null;
    }

    // If "normal" deletion, we continue
    if (startBlock === endBlock) {
        return null;
    }

    // If cursor is between multiple blocks,
    // we clear the content of the cells
    event.preventDefault();

    const { blocks, focusBlock } = state;
    blocks.forEach(
        (block) => {
            if (block.type !== opts.typeCell) {
                return change;
            }

            const cellRange = Slate.Selection.create()
                .moveToRangeOf(block);

            return change.deleteAtRange(cellRange);
        }
    );

    // Clear selected cells
    return change
        .collapseToStartOf(focusBlock);
}

module.exports = onBackspace;
