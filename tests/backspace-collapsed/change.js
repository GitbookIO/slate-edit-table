export default function(plugin, change) {
    const { value } = change;
    const blockStart = value.document.getDescendant('anchor');

    const withCursor = change.moveToStartOfNode(blockStart);

    plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    return change;
}
