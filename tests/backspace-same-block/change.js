import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const blockStart = value.document.getDescendant('anchor');
    const blockEnd = value.document.getDescendant('anchor');

    const withCursor = change
        .collapseToStartOf(blockStart)
        .extendToEndOf(blockEnd);

    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        withCursor
    );

    expect(result).toBe(undefined);

    return change;
}
