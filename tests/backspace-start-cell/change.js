import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const blockStart = value.document.getDescendant('anchor');

    const withCursor = change.collapseToStartOf(blockStart);

    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result).toBe(change);

    return change;
}
