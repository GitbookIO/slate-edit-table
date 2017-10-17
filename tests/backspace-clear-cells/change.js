module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');
    const blockEnd = state.document.getDescendant('focus');

    const withCursor = change
        .collapseToStartOf(blockStart)
        .extendToEndOf(blockEnd);

    return plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );
};
