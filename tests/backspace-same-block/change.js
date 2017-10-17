const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');
    const blockEnd = state.document.getDescendant('anchor');

    const withCursor = change
        .collapseToStartOf(blockStart)
        .extendToEndOf(blockEnd);

    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result).toBe(null);

    return change;
};
