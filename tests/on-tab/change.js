const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    const initialPosition = plugin.utils.getPosition(change.state);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to next column
    expect(position.getColumnIndex()).toEqual(initialPosition.getColumnIndex() + 1);

    return change;
};
