import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    expect(change.value.startBlock.key).toEqual('anchor_after');
    expect(change.value.startOffset).toEqual(0);
    return change;
}
