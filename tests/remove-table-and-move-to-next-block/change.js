import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    change.moveToRangeOfNode(cursorBlock);

    plugin.changes.removeTable(change);
    expect(change.value.startBlock.key).toEqual('anchor_after');
    expect(change.value.selection.start.offset).toEqual(0);
    return change;
}
