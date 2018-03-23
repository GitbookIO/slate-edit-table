import expect from 'expect';

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('anchor');
    const offset = 2;
    change.moveToRangeOf(cursorBlock).move(offset);

    plugin.changes.moveSelectionBy(change, -1, -1);

    expect(change.value.startBlock.text).toEqual('Col 0, Row 0');
    const selection = change.value.selection;
    expect(selection.startKey).toEqual(selection.endKey);

    return change;
}
