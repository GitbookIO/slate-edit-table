import expect from 'expect';

export default function(plugin, change) {
    let isDefaultPrevented = false;
    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {
                isDefaultPrevented = true;
            },
            stopPropagation() {}
        },
        change
    );

    // It shouldn't alter the default behavior...
    expect(isDefaultPrevented).toBe(false);

    // ...and let Slate do the work
    expect(result).toBe(undefined);

    return change;
}
