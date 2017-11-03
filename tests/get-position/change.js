const expect = require('expect');

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_');
    const offset = 2;

    change
        .moveToRangeOf(cursorBlock)
        .move(offset);

    const position = plugin.utils.getPosition(change.value);

    expect(position.getWidth()).toEqual(3);
    expect(position.getHeight()).toEqual(3);
    expect(position.getRowIndex()).toEqual(1);
    expect(position.getColumnIndex()).toEqual(1);

    return value;
};
