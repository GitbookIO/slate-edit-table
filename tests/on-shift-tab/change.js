const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    const initialPosition = plugin.utils.getPosition(change.state);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab', isShift: true },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to previous column
    expect(position.getColumnIndex()).toEqual(initialPosition.getColumnIndex() - 1);

    return change;
};
