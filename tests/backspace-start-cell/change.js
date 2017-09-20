const expect = require('expect');

module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');

    const withCursor = change
        .collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );

    expect(result).toBe(change);

    return change;
};
