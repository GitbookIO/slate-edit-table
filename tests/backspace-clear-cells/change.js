export default function(plugin, change) {
    const { value } = change;
    const blockStart = value.document.getDescendant('anchor');
    const blockEnd = value.document.getDescendant('focus');

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
}
