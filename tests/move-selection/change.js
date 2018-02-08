import expect from 'expect';

export default function(plugin, change) {
    const { state } = change;
    const cursorBlock = state.document.getDescendant('anchor');
    const offset = 2;
    change.moveToRangeOf(cursorBlock).move(offset);

    plugin.changes.moveSelection(change, 2, 2);

    expect(change.state.startBlock.text).toEqual('Col 2, Row 2');
    const selection = change.state.selection;
    expect(selection.startKey).toEqual(selection.endKey);
    // Keep same offset
    expect(selection.startOffset).toEqual(offset);

    return change;
}
