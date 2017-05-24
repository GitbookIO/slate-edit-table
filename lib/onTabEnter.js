const moveSelectionBy = require('./transforms/moveSelectionBy');

/**
 * Select all text of current block.
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function selectAllText(transform) {
    const { state } = transform;
    const { startBlock } = state;

    return transform
        .moveOffsetsTo(0)
        .extend(startBlock.length);
}

/**
 * Pressing "Tab" or "Enter" moves the cursor to the next cell
 * and select the whole text
 */
function onTabEnter(event, data, state, opts) {
    event.preventDefault();
    let transform = state.transform();
    let dx = 0;
    let dy = 0;

    if (data.key === 'tab') {
        dx = data.isShift ? -1 : 1;
    } else {
        dy = data.isShift ? -1 : 1;
    }

    // Move
    transform = moveSelectionBy(opts, transform, dx, dy);

    // Select all cell.
    return selectAllText(transform).apply();
}

module.exports = onTabEnter;
