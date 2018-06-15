export default function(plugin, change) {
    const blockStart = change.value.document.getDescendant('anchor');
    change.collapseToStartOf(blockStart);
    const withCursor = change.move(5);

    return plugin.onKeyDown(
        {
            key: 'Enter',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );
}
