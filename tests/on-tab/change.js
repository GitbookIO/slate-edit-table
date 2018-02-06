import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    const initialPosition = plugin.utils.getPosition(change.value);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        change
    );

    const position = plugin.utils.getPosition(change.value);

    // Same row
    expect(position.getRowIndex()).toEqual(initialPosition.getRowIndex());
    // Moved to next column
    expect(position.getColumnIndex()).toEqual(
        initialPosition.getColumnIndex() + 1
    );

    return change;
}
