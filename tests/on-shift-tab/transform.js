const expect = require('expect');

module.exports = function(plugin, state) {
    const cursorBlock = state.document.getDescendant('_cursor_');
    const transform = state.transform();
    state = transform.moveToRangeOf(cursorBlock).apply();

    const initialPosition = plugin.utils.getPosition(state);

    state = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'tab', isShift: true },
        state
    );

    const position = plugin.utils.getPosition(state);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to previous column
    expect(position.getColumnIndex()).toEqual(initialPosition.getColumnIndex() - 1);

    return state;
};
