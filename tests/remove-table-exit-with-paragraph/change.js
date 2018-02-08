import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    const { state } = change;
    expect(state.startBlock.type).toEqual('paragraph');
    expect(change.state.startOffset)
        .toEqual(change.state.startBlock.text.length)
        .toEqual(0);
    return change;
}
