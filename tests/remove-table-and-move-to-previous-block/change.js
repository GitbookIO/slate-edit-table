import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    expect(change.state.startBlock.key).toEqual('anchor_after');
    expect(change.state.startOffset).toEqual(
        change.state.startBlock.text.length
    );
    return change;
}
