const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();
    state = transform.moveToRangeOf(cursorBlock).apply();

    state = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab', isShift: true },
        state
    );

    const position = plugin.utils.getPosition(state);

    // First row (new one)
    expect(position.getRowIndex()).toEqual(0);
    // Last cell
    expect(position.getColumnIndex()).toEqual(2);

    return state;
};
