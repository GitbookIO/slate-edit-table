const expect = require('expect');

module.exports = function(plugin, state) {
    const blockStart = state.document.getDescendant('_cursor_');
    const withCursor = state.transform()
        .collapseToStartOf(blockStart)
        .apply();

    const result = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter', isMod: true },
        withCursor
    );

    expect(result.startBlock.type).toBe('paragraph');

    return result;
};
