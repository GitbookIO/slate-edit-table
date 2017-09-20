const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const offset = 2;
    const transform = state.transform();
    state = transform
        .moveToRangeOf(cursorBlock)
        .move(offset)
        .apply();

    const position = plugin.utils.getPosition(state);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    return state;
};
