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
        { key: 'tab' },
        state
    );

    const position = plugin.utils.getPosition(state);

    // Last row (new one)
    expect(position.getRowIndex()).toEqual(2);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return state;
};
