module.exports = function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('anchor');

    const withCursor = change
        .collapseToStartOf(blockStart);

    plugin.onKeyDown(
        {
            preventDefault() {},
            stopPropagation() {}
        },
        { key: 'backspace' },
        withCursor
    );

    return change;
};
