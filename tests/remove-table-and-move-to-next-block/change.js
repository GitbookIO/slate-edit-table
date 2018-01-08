import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    expect(change.value.startBlock.key).toEqual('_cursor_after_');
    expect(change.value.startOffset).toEqual(0);
    return change;
}
