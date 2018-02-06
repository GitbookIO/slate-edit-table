import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    expect(change.state.startBlock.key).toEqual('_cursor_after_');
    expect(change.state.startOffset).toEqual(0);
    return change;
}
