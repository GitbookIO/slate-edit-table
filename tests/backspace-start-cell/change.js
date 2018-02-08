import expect from 'expect';

export default function(plugin, change) {
    const { state } = change;
    const blockStart = state.document.getDescendant('_cursor_');

    const withCursor = change.collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        null,
        withCursor
    );

    expect(result).toBe(change);

    return change;
}
