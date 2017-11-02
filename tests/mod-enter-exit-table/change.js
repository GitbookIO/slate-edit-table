const expect = require('expect');

module.exports = function(plugin, change) {
    const blockStart = change.value.document.getDescendant('_cursor_');
    const withCursor = change
        .collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            key: 'Enter',
            metaKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result.value.startBlock.type).toBe('paragraph');

    return result;
};
