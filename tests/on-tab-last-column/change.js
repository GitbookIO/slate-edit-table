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

    // Next row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex() + 1);
    // Moved to first column
    expect(position.getColumnIndex()).toEqual(0);

    return change;
};
