import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.onKeyDown(
        {
            key: 'Tab',
            preventDefault() {},
            stopPropagation() {}
        },
        null,
        change
    );

    const position = plugin.utils.getPosition(change.state);

    // Last row (new one)
    expect(position.getRowIndex()).toEqual(2);
    // First cell
    expect(position.getColumnIndex()).toEqual(0);

    return change;
}
