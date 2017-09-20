const expect = require('expect');

module.exports = function(plugin, change) {
    const blockStart = change.state.document.getDescendant('_cursor_');
    const withCursor = change
        .collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'enter', isMod: true },
        withCursor
    );

    expect(result.state.startBlock.type).toBe('paragraph');

    return result;
};
