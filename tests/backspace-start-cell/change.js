import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const blockStart = value.document.getDescendant('anchor');
    const withCursor = change.collapseToStartOf(blockStart);

    let isDefaultPrevented = false;
    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {
                isDefaultPrevented = true;
            },
            stopPropagation() {}
        },
        withCursor
    );

    // It should have prevented the default behavior...
    expect(isDefaultPrevented).toBe(true);

    // ...and left the change unchanged
    expect(result).toBe(change);

    return change;
}
