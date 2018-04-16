import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            shiftKey: true,
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.value);

    // First row (new one)
    expect(position.getRowIndex()).toEqual(0);
    // Last cell
    expect(position.getColumnIndex()).toEqual(2);

    return change;
}
