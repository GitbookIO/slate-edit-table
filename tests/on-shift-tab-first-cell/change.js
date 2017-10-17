const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // First row (new one)
    expect(position.getRowIndex()).toEqual(0);
    // Last cell
    expect(position.getColumnIndex()).toEqual(2);

    return change;
};
