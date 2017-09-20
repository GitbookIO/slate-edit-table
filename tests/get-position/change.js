const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('_cursor_');
    const offset = 2;

    change
        .moveToRangeOf(cursorBlock)
        .move(offset);

    const position = plugin.utils.getPosition(change.state);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    return state;
};
