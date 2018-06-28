import expect from 'expect';

export default function(plugin, change) {
    const result = plugin.onKeyDown(
        {
            key: 'Backspace',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    expect(result).toBe(undefined);

    return change;
}
