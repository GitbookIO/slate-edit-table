const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');
    const offset = 2;
    change
        .moveToRangeOf(cursorBlock)
        .move(offset);

    plugin.changes
        .moveSelectionBy(change, -1, -1);

    expect(change.state.startBlock.text).toEqual('Col 0, Row 0');
    const selection = change.state.selection;
    expect(selection.startKey).toEqual(selection.endKey);
    // Keep same offset
    expect(selection.startOffset).toEqual(offset);

    return change;
};
