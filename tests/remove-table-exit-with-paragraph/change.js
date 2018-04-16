import expect from 'expect';

export default function(plugin, change) {
    const cursorBlock = change.value.document.getDescendant('anchor');
    change.moveToRangeOf(cursorBlock);

    plugin.changes.removeTable(change);
    const { value } = change;
    expect(value.startBlock.type).toEqual('paragraph');
    expect(change.value.startOffset)
        .toEqual(change.value.startBlock.text.length)
        .toEqual(0);
    return change;
}
