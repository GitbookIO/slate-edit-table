const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Last row (new one)
    expect(position.getRowIndex()).toEqual(2);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return change;
};
