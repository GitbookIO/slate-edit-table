import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    const offset = 2;
    change.moveToRangeOf(cursorBlock).move(offset);

    plugin.changes.moveSelection(change, 2, 2);

    expect(change.value.startBlock.text).toEqual('Col 2, Row 2');
    const selection = change.value.selection;
    expect(selection.startKey).toEqual(selection.endKey);

    return change;
}
